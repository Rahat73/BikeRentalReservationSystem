import { Types, startSession } from 'mongoose';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Bike } from '../bike/bike.model';
import AppError from '../../errors/AppError';
import { rentalCost } from './booking.utility';
import QueryBuilder from '../../../builder/QueryBuilder';
import { initiatePayment } from '../payment/payment.utils';
import { TCoupon } from '../coupon/coupon.interface';
import { Coupon } from '../coupon/coupon.model';

const createBookingIntoDB = async (
  email: string,
  payload: Pick<TBooking, 'bikeId' | 'startTime'>,
) => {
  //check if bike is available
  const bike = await Bike.findById(payload.bikeId);
  if (!bike) throw new AppError(404, 'No bike found');
  if (!bike.isAvailable) throw new AppError(400, 'Bike is not available');

  //fetch user id with email which is decoded from  access_token
  const user = await User.findOne({ email });
  if (!user) throw new AppError(404, 'No user found');

  const trxId = `trx_${Date.now()}_${Math.floor(Math.random() * 100000)}`;

  const bookingInfo: Partial<TBooking> = {
    trxId: trxId,
    userId: user?._id as Types.ObjectId,
    bikeId: payload.bikeId,
    startTime: payload.startTime,
  };

  const session = await startSession();

  try {
    session.startTransaction();

    await Booking.create([bookingInfo], { session });

    //update bike isAvailable status
    // await Bike.findByIdAndUpdate(
    //   payload.bikeId,
    //   {
    //     isAvailable: false,
    //     isPaid: false,
    //   },
    //   { session },
    // );

    const paymentData = {
      tran_id: trxId,
      amount: '100',
      cus_name: user.name,
      cus_email: user.email,
      cus_add1: user.address,
      cus_phone: user.phone,
    };

    const paymentSession = await initiatePayment(paymentData, 'booking');

    await session.commitTransaction();
    await session.endSession();
    return { payment_url: paymentSession.payment_url };

    // return result
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, (error as Error)?.message);
  }
};

const returnBike = async (
  bookingId: string,
  payload: Pick<TBooking, 'returnTime'>,
) => {
  //check if booking exists
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new AppError(404, 'No booking found');

  const returnTime = payload.returnTime || new Date();

  const timeStart = new Date(booking.startTime);
  const timeEnd = new Date(returnTime);

  if (returnTime && timeStart > timeEnd)
    throw new AppError(400, 'Return time must be after start time');

  //fetch bike information
  const bike = await Bike.findById(booking.bikeId);

  const totalCost: number = rentalCost(
    bike?.pricePerHour as number,
    timeStart as Date,
    timeEnd as Date,
  );

  const session = await startSession();

  try {
    session.startTransaction();
    const result = await Booking.findByIdAndUpdate(
      bookingId,
      {
        isReturned: true,
        returnTime,
        totalCost,
      },
      {
        new: true,
        session,
      },
    );

    //update bike isAvailable status
    await Bike.findByIdAndUpdate(
      booking.bikeId,
      {
        isAvailable: true,
      },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, (error as Error)?.message);
  }
};

const payment = async (bookingId: string) => {
  //check if booking exists
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new AppError(404, 'No booking found');

  const user = await User.findById(booking.userId);
  if (!user) throw new AppError(404, 'No user found');

  if (!booking.isReturned) throw new AppError(400, 'Bike is not returned yet');

  // const paymentData = {
  //   tran_id: bookingId,
  //   amount: booking.totalCost,
  //   cus_name: (booking.userId as unknown as { name: string }).name,
  //   cus_email: (booking.userId as unknown as { email: string }).email,
  //   cus_add1: (booking.userId as unknown as { address: string }).address,
  //   cus_phone: (booking.userId as unknown as { phone: string }).phone,
  // };

  const paymentData = {
    tran_id: bookingId,
    amount: booking.totalCost.toFixed(2),
    cus_name: user.name,
    cus_email: user.email,
    cus_add1: user.address,
    cus_phone: user.phone,
  };

  const paymentSession = await initiatePayment(paymentData, 'final-payment');

  // const result = await Booking.findByIdAndUpdate(
  //   bookingId,
  //   {
  //     isPaid: true,
  //   },
  //   {
  //     new: true,
  //   },
  // );

  return { payment_url: paymentSession.payment_url };
};

const getMyBookingsFromDB = async (email: string) => {
  const user = await User.findOne({ email });

  const bookings = await Booking.find({ userId: user?._id }).populate('bikeId');

  return bookings;
};

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    Booking.find().populate('userId').populate('bikeId'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookingQuery.modelQuery;

  return result;
};

const applyCouponIntoDB = async (bookingId: string, payload: TCoupon) => {
  //check if booking exists
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new AppError(404, 'No booking found');

  //check if coupon is already applied
  if (booking.isCouponApplied)
    throw new AppError(400, 'Coupon is already applied');

  //check if coupon is valid
  const coupon = await Coupon.findOne({ couponCode: payload.couponCode });
  if (!coupon) throw new AppError(404, 'Invalid coupon code');

  const newTotalCost =
    booking.totalCost - booking.totalCost * (coupon.discountPercent / 100);

  const result = await Booking.findByIdAndUpdate(
    bookingId,
    {
      isCouponApplied: true,
      totalCost: newTotalCost,
    },
    {
      new: true,
    },
  );

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  returnBike,
  payment,
  getMyBookingsFromDB,
  getAllBookingsFromDB,
  applyCouponIntoDB,
};
