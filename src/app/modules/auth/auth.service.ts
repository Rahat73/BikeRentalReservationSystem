import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const signUpUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  //check if user exists
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(404, 'No user found with this email');
  }

  //check if password is correct
  if (user.password !== payload.password) {
    throw new AppError(401, 'Incorrect password');
  }

  return user;
};

export const AuthServices = {
  signUpUser,
  loginUser,
};
