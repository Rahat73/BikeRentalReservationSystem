import { UserRole } from './user.constant';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: keyof typeof UserRole;
};
