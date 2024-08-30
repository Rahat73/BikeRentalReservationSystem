import { z } from 'zod';

const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number'),
    isAvailable: z.boolean().optional().default(true),
    cc: z.number().positive('CC must be a positive number'),
    year: z.number().int().positive('Year must be a positive integer'),
    model: z.string().min(1, 'Model is required'),
    brand: z.string().min(1, 'Brand is required'),
    img_url: z.string().optional(),
  }),
});

const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number')
      .optional(),
    isAvailable: z.boolean().optional(),
    cc: z.number().positive('CC must be a positive number').optional(),
    year: z
      .number()
      .int()
      .positive('Year must be a positive integer')
      .optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
    img_url: z.string().optional(),
  }),
});

export const BikeValidations = {
  createBikeValidationSchema,
  updateBikeValidationSchema,
};
