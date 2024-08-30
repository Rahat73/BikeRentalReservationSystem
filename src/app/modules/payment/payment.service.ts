import { readFileSync } from 'fs';
import { startSession } from 'mongoose';
import { join } from 'path';
import AppError from '../../errors/AppError';
import { Bike } from '../bike/bike.model';
import { Booking } from '../booking/booking.model';
import { verifyPayment } from './payment.utils';

const bookingConfirmation = async (trxId: string, status: string) => {
  const verifyResponse = await verifyPayment(trxId);

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    const session = await startSession();

    try {
      session.startTransaction();

      const booking = await Booking.findOne({ trxId });
      if (!booking) throw new AppError(404, 'No booking found');

      //update booking status
      await Booking.findOneAndUpdate(
        { trxId },
        {
          isBooked: true,
        },
        {
          session,
        },
      );

      //update bike isAvailable status
      await Bike.findByIdAndUpdate(
        booking.bikeId,
        {
          isAvailable: false,
        },
        { session },
      );

      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      status = 'failed';
      // throw new AppError(400, (error as Error)?.message);
    }
  }

  const filePath = join(__dirname, '../../../views/confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', `Booking ${status}`);

  return template;
};

const paymentConfirmation = async (trxId: string, status: string) => {
  const verifyResponse = await verifyPayment(trxId);

  //   let result;

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    await Booking.findByIdAndUpdate(trxId, {
      isPaid: true,
    });
  }

  const filePath = join(__dirname, '../../../views/confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', `Payment ${status}`);

  return template;
};

export const PaymentServices = {
  bookingConfirmation,
  paymentConfirmation,
};
