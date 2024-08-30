import { Schema, model } from 'mongoose';
import { TCoupon } from './coupon.interface';

const couponSchema = new Schema<TCoupon>({
  couponCode: { type: String, required: true },
  discountPercent: { type: Number, required: true },
});

export const Coupon = model<TCoupon>('Coupon', couponSchema);
