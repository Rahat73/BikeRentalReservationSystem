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
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(404, 'No user found with this email');
  }

  //check if password is correct
  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(401, 'Incorrect password');
  }

  return user;
};

export const AuthServices = {
  signUpUser,
  loginUser,
};
