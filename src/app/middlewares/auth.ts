import jwt from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { AppError } from '../errors/AppError';
import httpStatus from 'http-status-codes';
import { TJwtPayload } from '../modules/auth/auth.interface';

export const unAuthError = new AppError(
  'Unauthorized Access',
  'You do not have the necessary permissions to access this resource.',
  httpStatus.UNAUTHORIZED,
  null,
  null,
);

export const auth = (...userRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers?.authorization;
    if (!token) {
      throw unAuthError;
    }
    console.log({ token });
    const decodePayload = jwt.verify(
      token as string,
      config.jwt_access_secret as string,
    ) as TJwtPayload;
    console.log({ decodePayload });
    if (userRoles && !userRoles.includes(decodePayload.role)) {
      throw unAuthError;
    }
    next();
  });
};
