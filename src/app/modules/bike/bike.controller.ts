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
  const result = await BikeServices.getAllBikeFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bikes retrieved successfully',
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getAllBikes,
};
