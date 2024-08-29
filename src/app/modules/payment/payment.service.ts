import { join } from 'path';
import { readFileSync } from 'fs';
import { Booking } from '../booking/booking.model';
import { verifyPayment } from './payment.utils';

const confirmation = async (trxId: string, status: string) => {
  const verifyResponse = await verifyPayment(trxId);

  //   let result;

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    await Booking.findByIdAndUpdate(trxId, {
      isPaid: true,
    });
  }

  const filePath = join(__dirname, '../../../views/confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', status);

  return template;
};

export const PaymentServices = {
  confirmation,
};
