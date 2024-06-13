import { Types, startSession } from 'mongoose';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Bike } from '../bike/bike.model';
import AppError from '../../errors/AppError';

const createBookingIntoDB = async (
  email: string,
  payload: Pick<TBooking, 'bikeId' | 'startTime'>,
) => {
  //check if bike is available
  const bike = await Bike.findById(payload.bikeId);
  if (!bike) throw new AppError(404, 'Bike not found');
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

    await Bike.findByIdAndUpdate(
      payload.bikeId,
      {
        isAvailable: false,
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

export const BookingServices = {
  createBookingIntoDB,
};
