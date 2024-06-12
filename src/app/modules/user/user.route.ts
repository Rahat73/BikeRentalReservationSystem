import { Router } from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = Router();

// router.post('/create-user', UserControllers.createUser);

router.get('/me', auth('admin', 'user'), UserControllers.getProfile);

export const UserRoutes = router;
