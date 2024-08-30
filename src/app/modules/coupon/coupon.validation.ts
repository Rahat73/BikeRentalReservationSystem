import { z } from 'zod';

const couponValidationSchema = z.object({
  body: z.object({
    couponCode: z.string().min(1, 'Coupon code is required'),
    discountPercent: z.number().positive('Discount must be a positive number'),
  }),
});

export const CouponValidations = {
  couponValidationSchema,
};
