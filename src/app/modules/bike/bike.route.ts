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

router.get('/', auth(), BikeControllers.getAllBikes);

router.get('/:bikeId', auth(), BikeControllers.getBikeById);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(BikeValidations.updateBikeValidationSchema),
  BikeControllers.updateBike,
);

router.delete('/:id', auth('admin'), BikeControllers.deleteBike);

export const BikeRoutes = router;
