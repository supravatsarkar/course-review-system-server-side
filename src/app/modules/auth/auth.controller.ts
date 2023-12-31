import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import httpStatus from 'http-status-codes';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthService.registerUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User login successful',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...jwtPayload } = req.user;
  const { data, message, statusCode } = await AuthService.changePassword(
    jwtPayload,
    req.body,
  );
  sendResponse(res, {
    success: data ? true : false,
    statusCode: statusCode || httpStatus.OK,
    message: message || 'Password changed successfully',
    data: data,
  });
});

export const AuthController = {
  registerUser,
  loginUser,
  changePassword,
};
