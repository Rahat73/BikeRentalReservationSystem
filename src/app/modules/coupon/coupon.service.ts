import QueryBuilder from '../../../builder/QueryBuilder';
import { TCoupon } from './coupon.interface';
import { Coupon } from './coupon.model';

const createCouponIntoDB = async (payload: TCoupon) => {
  const result = await Coupon.create(payload);
  return result;
};

const getAllCouponsFromDB = async (query: Record<string, unknown>) => {
  const couponQuery = new QueryBuilder(Coupon.find(), query).filter();

  const result = await couponQuery.modelQuery;

  return result;
};

const deleteCouponFromDB = async (id: string) => {
  const result = await Coupon.findByIdAndDelete(id);

  return result;
};

export const CouponServices = {
  createCouponIntoDB,
  getAllCouponsFromDB,
  deleteCouponFromDB,
};
