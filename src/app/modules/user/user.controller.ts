import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

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

const makeAdmin = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await UserServices.makeAdmin(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Promoted to admin successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await UserServices.deleteUserFromDB(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserControllers = {
  getAllUsers,
  getProfile,
  updateProfile,
  makeAdmin,
  deleteUser,
};
