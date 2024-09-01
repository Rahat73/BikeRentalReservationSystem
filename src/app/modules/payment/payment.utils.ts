import axios from 'axios';
import config from '../../config';
import AppError from '../../errors/AppError';

export const initiatePayment = async (
  {
    tran_id,
    amount,
    cus_name,
    cus_email,
    cus_add1,
    cus_phone,
  }: {
    tran_id: string;
    amount: string;
    cus_name: string;
    cus_email: string;
    cus_add1: string;
    cus_phone: string;
  },
  paymentType: string,
) => {
  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      tran_id,
      success_url: `https://bike-rental-reservation-system-backend-seven.vercel.app/api/payment/confirmation/${paymentType}?trxId=${tran_id}&status=successful`,
      fail_url: `https://bike-rental-reservation-system-backend-seven.vercel.app/api/payment/confirmation/${paymentType}?trxId=${tran_id}&status=failed`,
      cancel_url: 'http://localhost:5173/',
      amount,
      currency: 'BDT',
      signature_key: config.signature_key,
      desc: 'Merchant Registration Payment',
      cus_name,
      cus_email,
      cus_add1,
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'N/A',
      cus_phone,
      type: 'json',
    });

    return response.data;
  } catch (error) {
    throw new AppError(400, `Payment initiation failed`);
  }
};

export const verifyPayment = async (trxId: string) => {
  try {
    const response = await axios.get(config.payment_verification_url!, {
      params: {
        store_id: config.store_id,
        signature_key: config.signature_key,
        type: 'json',
        request_id: trxId,
      },
    });

    return response.data;
  } catch (error) {
    throw new AppError(400, `Payment verification failed`);
  }
};
