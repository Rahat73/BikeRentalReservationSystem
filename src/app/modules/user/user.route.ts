import { Router } from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = Router();

router.get('/me', auth('admin', 'user'), UserControllers.getProfile);

router.put(
  '/me',
  auth('admin', 'user'),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateProfile,
);

export const UserRoutes = router;
