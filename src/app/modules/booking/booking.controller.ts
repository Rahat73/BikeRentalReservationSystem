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

const returnBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.returnBike(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike returned successfully',
    data: result,
  });
});

const getMyBookings = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await BookingServices.getMyBookingsFromDB(email);

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'No data found',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Rentals retrieved successfully',
      data: result,
    });
  }
});

export const BookingControllers = {
  createBooking,
  returnBike,
  getMyBookings,
};
