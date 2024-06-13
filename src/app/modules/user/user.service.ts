import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const getProfileFromDB = async (email: string) => {
  const profile = await User.findOne({ email });
  return profile;
};

const updateProfileIntoDB = async (email: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ email }, payload, { new: true });
  return result;
};

export const UserServices = {
  getProfileFromDB,
  updateProfileIntoDB,
};
