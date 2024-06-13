import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { User } from './user.model';
import { UserServices } from './user.service';

const getProfile = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await UserServices.getProfileFromDB(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await UserServices.updateProfileIntoDB(email, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

export const UserControllers = {
  getProfile,
  updateProfile,
};
