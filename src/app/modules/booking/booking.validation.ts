import { z } from 'zod';

export const bookingValidationSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    bikeId: z.string().min(1, 'Bike ID is required'),
    startTime: z.date({ required_error: 'Start time is required' }),
    returnTime: z.date({ required_error: 'Return time is required' }),
    totalCost: z.number().positive('Total cost must be a positive number'),
    isReturned: z.boolean().optional().default(false),
  }),
});

export const BookingValidations = {
  bookingValidationSchema,
};
