import { z } from 'zod';

export const createBookingValidationSchema = z.object({
  body: z.object({
    bikeId: z.string().min(1, 'Bike ID is required'),
    startTime: z
      .string({ required_error: 'Start time is required' })
      .datetime(),
    // .refine(
    //   (dateStr) => {
    //     const startTime = new Date(dateStr);
    //     return startTime < new Date();
    //   },
    //   {
    //     message: 'Start time must be before the current time',
    //   },
    // ),
  }),
});

const returnBikeValidationSchema = z.object({
  body: z.object({
    returnTime: z
      .string({ required_error: 'Return time is required' })
      .datetime(),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
  returnBikeValidationSchema,
};
