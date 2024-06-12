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
