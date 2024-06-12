import { Model } from 'mongoose';
import { UserRole } from './user.constant';

export type TUserRole = keyof typeof UserRole;

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TUserRole;
};

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
