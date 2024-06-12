import { Router } from 'express';
import { UserControllers } from './user.controller';

const router = Router();

// router.post('/create-user', UserControllers.createUser);

router.get('/me', UserControllers.getProfile);

export const UserRoutes = router;
