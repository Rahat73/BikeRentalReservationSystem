import catchAsync from '../../utils/catchAsync';
import { PaymentServices } from './payment.service';

const paymentConfirmation = catchAsync(async (req, res) => {
  const { trxId, status } = req.query;

  const result = await PaymentServices.confirmation(
    trxId as string,
    status as string,
  );

  res.send(result);
});

export const PaymentControllers = {
  paymentConfirmation,
};
