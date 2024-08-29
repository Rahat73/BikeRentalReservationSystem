import { Router } from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = Router();

router.get('/', auth('admin'), UserControllers.getAllUsers);

router.get('/me', auth('admin', 'user'), UserControllers.getProfile);

router.put(
  '/me',
  auth('admin', 'user'),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateProfile,
);

router.put('/:userId', auth('admin'), UserControllers.makeAdmin);

router.delete('/:userId', auth('admin'), UserControllers.deleteUser);

export const UserRoutes = router;
