import catchAsync from '../../utils/catchAsync';
import { PaymentServices } from './payment.service';

const bookingConfirmation = catchAsync(async (req, res) => {
  const { trxId, status } = req.query;

  const result = await PaymentServices.bookingConfirmation(
    trxId as string,
    status as string,
  );

  res.send(result);
});

const paymentConfirmation = catchAsync(async (req, res) => {
  const { trxId, status } = req.query;

  const result = await PaymentServices.paymentConfirmation(
    trxId as string,
    status as string,
  );

  res.send(result);
});

export const PaymentControllers = {
  bookingConfirmation,
  paymentConfirmation,
};
