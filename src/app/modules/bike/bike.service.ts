import AppError from '../../errors/AppError';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};

const getAllBikeFromDB = async () => {
  const result = await Bike.find();
  return result;
};

const updateBikeIntoDB = async (id: string, payload: Partial<TBike>) => {
  //check if bike exists
  const bike = await Bike.findById(id);
  if (!bike) throw new AppError(404, 'Bike not found');

  const result = await Bike.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteBikeFromDB = async (id: string) => {
  //check if bike exists
  const bike = await Bike.findById(id);
  if (!bike) throw new AppError(404, 'Bike not found');

  const result = await Bike.findByIdAndDelete(id);
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikeFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
