import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { User } from './user.model';
import { UserServices } from './user.service';

const getProfile = catchAsync(async (req, res) => {
  const result = await UserServices.getProfileFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  getProfile,
};
