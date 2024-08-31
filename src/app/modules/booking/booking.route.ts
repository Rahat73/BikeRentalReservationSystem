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

router.put(
  '/:id/return',
  auth('admin'),
  validateRequest(BookingValidations.returnBikeValidationSchema),
  BookingControllers.returnBike,
);

router.put('/:id/payment', auth('admin', 'user'), BookingControllers.payment);

router.get('/me', auth('admin', 'user'), BookingControllers.getMyBookings);

router.get('/', auth('admin'), BookingControllers.getAllBookings);

router.put(
  '/:id/coupon',
  auth('admin', 'user'),
  BookingControllers.applyCoupon,
);

export const BookingRoutes = router;
