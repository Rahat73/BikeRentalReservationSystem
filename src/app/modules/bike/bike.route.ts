import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BikeValidations } from './bike.validation';
import auth from '../../middlewares/auth';
import { BikeControllers } from './bike.controller';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(BikeValidations.createBikeValidationSchema),
  BikeControllers.createBike,
);

router.get('/', BikeControllers.getAllBikes);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(BikeValidations.updateBikeValidationSchema),
  BikeControllers.updateBike,
);

export const BikeRoutes = router;
