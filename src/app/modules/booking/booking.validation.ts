import { z } from 'zod';

export const createBookingValidationSchema = z.object({
  body: z.object({
    bikeId: z.string().min(1, 'Bike ID is required'),
    startTime: z
      .string({ required_error: 'Start time is required' })
      .datetime(),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
