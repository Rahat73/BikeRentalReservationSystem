import { Types, startSession } from 'mongoose';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Bike } from '../bike/bike.model';
import AppError from '../../errors/AppError';
import { rentalCost } from './booking.utility';
import QueryBuilder from '../../../builder/QueryBuilder';

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

  const bookingInfo: Partial<TBooking> = {
    userId: user?._id as Types.ObjectId,
    bikeId: payload.bikeId,
    startTime: payload.startTime,
  };

  const session = await startSession();

  try {
    session.startTransaction();
    const result = await Booking.create([bookingInfo], { session });

    //update bike isAvailable status
    await Bike.findByIdAndUpdate(
      payload.bikeId,
      {
        isAvailable: false,
        isPaid: false,
      },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    return result[0];
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
    booking.startTime as Date,
    returnTime as Date,
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

  const result = await Booking.findByIdAndUpdate(
    bookingId,
    {
      isPaid: true,
    },
    {
      new: true,
    },
  );

  return result;
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

export const BookingServices = {
  createBookingIntoDB,
  returnBike,
  payment,
  getMyBookingsFromDB,
  getAllBookingsFromDB,
};
