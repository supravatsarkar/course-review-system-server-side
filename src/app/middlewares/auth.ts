import jwt from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { AppError } from '../errors/AppError';
import httpStatus from 'http-status-codes';
import { TJwtPayload } from '../modules/auth/auth.interface';
import UserModel from '../modules/user/user.model';
import { isJwtBeforePasswordChangeTimestamp } from '../utils';

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
      console.log('Auth: Blank token');
      throw unAuthError;
    }
    console.log({ token });
    const decodePayload = jwt.verify(
      token as string,
      config.jwt_access_secret as string,
    ) as TJwtPayload;
    console.log({ decodePayload });
    if (userRoles && !userRoles.includes(decodePayload.role)) {
      console.log('Auth: Role not match');
      throw unAuthError;
    }
    const isUserExist = await UserModel.isUserExist(decodePayload._id);
    if (!isUserExist) {
      console.log('Auth: User not exit!');
      throw unAuthError;
    }

    if (
      isUserExist?.passwordChangedAt &&
      isJwtBeforePasswordChangeTimestamp(
        isUserExist.passwordChangedAt,
        decodePayload.iat as number,
      )
    ) {
      console.log('Auth: Jwt before password change timestamp!!');
      throw unAuthError;
    }
    req.user = decodePayload;
    next();
  });
};
