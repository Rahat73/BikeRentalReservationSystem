import { z } from 'zod';
import { UserRole } from './user.constant';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    phone: z.string().min(10, 'Invalid phone number'),
    address: z.string().min(1, 'Address is required'),
    role: z.enum(Object.values(UserRole) as [string, ...string[]], {
      message: 'Invalid role',
    }),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};
