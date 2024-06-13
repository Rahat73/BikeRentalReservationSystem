import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidations } from './booking.validation';
import { BookingServices } from './booking.service';
import { BookingControllers } from './booking.controller';

const router = Router();

router.post(
  '/',
  auth(),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking,
);

export const BookingRoutes = router;
