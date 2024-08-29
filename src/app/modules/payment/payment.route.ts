import { Router } from 'express';
import { PaymentControllers } from './payment.controller';

const router = Router();

router.post('/confirmation', PaymentControllers.paymentConfirmation);

// router.get('/', auth('admin'), BookingControllers.getAllBookings);

export const PaymentRoutes = router;
