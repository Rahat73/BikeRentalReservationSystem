import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CouponServices } from './coupon.service';

const createCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.createCouponIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Coupon created successfully',
    data: result,
  });
});

const getAllCoupons = catchAsync(async (req, res) => {
  const result = await CouponServices.getAllCouponsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});

const deleteCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.deleteCouponFromDB(req.params.couponId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Coupon deleted successfully',
    data: result,
  });
});

export const CouponControllers = {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
};
