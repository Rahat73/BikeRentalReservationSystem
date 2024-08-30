import { Router } from 'express';
import { PaymentControllers } from './payment.controller';

const router = Router();

router.post('/confirmation/booking', PaymentControllers.bookingConfirmation);

router.post(
  '/confirmation/final-payment',
  PaymentControllers.paymentConfirmation,
);

// router.get('/', auth('admin'), BookingControllers.getAllBookings);

export const PaymentRoutes = router;
