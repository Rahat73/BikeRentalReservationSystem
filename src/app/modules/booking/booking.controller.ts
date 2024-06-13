import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await BookingServices.createBookingIntoDB(email, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Rental created successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
};
