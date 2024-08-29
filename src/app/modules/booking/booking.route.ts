import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingControllers } from './booking.controller';
import { BookingValidations } from './booking.validation';

const router = Router();

router.post(
  '/',
  auth('admin', 'user'),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking,
);

router.put('/:id/return', auth('admin'), BookingControllers.returnBike);

router.put('/:id/payment', auth('admin'), BookingControllers.payment);

router.get('/', auth('admin', 'user'), BookingControllers.getMyBookings);

export const BookingRoutes = router;
