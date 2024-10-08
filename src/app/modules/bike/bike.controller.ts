import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './bike.service';

const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.createBikeIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike added successfully',
    data: result,
  });
});

const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikeFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bikes retrieved successfully',
    data: result,
  });
});

const getBikeById = catchAsync(async (req, res) => {
  const result = await BikeServices.getBikeByIdFromDB(req.params.bikeId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike retrieved successfully',
    data: result,
  });
});

const updateBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.updateBikeIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike updated successfully',
    data: result,
  });
});

const deleteBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.deleteBikeFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike deleted successfully',
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getAllBikes,
  getBikeById,
  updateBike,
  deleteBike,
};
