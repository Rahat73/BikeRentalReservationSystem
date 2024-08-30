import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CouponValidations } from './coupon.validation';
import { CouponControllers } from './coupon.controller';

const router = Router();

router.get('/', CouponControllers.getAllCoupons);

router.post(
  '/',
  auth('admin'),
  validateRequest(CouponValidations.couponValidationSchema),
  CouponControllers.createCoupon,
);

router.delete('/:couponId', auth('admin'), CouponControllers.deleteCoupon);

export const CouponRoutes = router;
