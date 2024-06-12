import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthControllers } from './auth.controller';

const router = Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserValidationSchema),
  AuthControllers.signUpUser,
);

export const AuthRoutes = router;
