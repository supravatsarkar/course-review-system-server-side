import UserModel from '../user/user.model';
import httpStatus from 'http-status-codes';
import { TUser } from '../user/user.interface';
import { TJwtPayload, TLoginUserPayload } from './auth.interface';
import { AppError } from '../../errors/AppError';
import { isPasswordMatch } from '../../utils';
import { createToken } from './auth.utils';
import config from '../../config';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const registerUserIntoDB = async (payload: TUser) => {
  const result = (await UserModel.create(payload)).toJSON() as Partial<TUser>;
  delete result?.password;
  delete result?.passwordChangedAt;
  delete result?.passwordHistory;
  return { result };
};
const loginUser = async (loginPayload: TLoginUserPayload) => {
  // user exiting check
  const isUserExist = (await UserModel.findByUsername(
    loginPayload.username,
  )) as TUser & { _id: string };
  console.log({ isUserExist });
  if (!isUserExist) {
    throw new AppError('', 'User not found!', httpStatus.NOT_FOUND);
  }

  // password compare
  if (!(await isPasswordMatch(loginPayload.password, isUserExist.password))) {
    throw new AppError('', 'Password does not match!', httpStatus.CONFLICT);
  }

  //  if password match issue token and send to response

  // jwt payload for issuing token
  const jwtPayload = {
    _id: isUserExist._id,
    role: isUserExist.role,
    email: isUserExist.email,
  };

  // token create with payload, signature secret and expire time
  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire as string,
  );

  const user = {
    _id: isUserExist._id,
    username: isUserExist.username,
    email: isUserExist.email,
    role: isUserExist.role,
  };
  return { user, token };
};
const changePassword = async (
  jwtPayload: TJwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  const { _id } = jwtPayload;
  const fetchedUser = await UserModel.isUserExist(_id);
  console.log({ fetchedUser });
  if (!fetchedUser) {
    {
      throw new AppError('', 'User not found!', httpStatus.NOT_FOUND);
    }
  }

  // validate old current password
  if (
    !(await isPasswordMatch(
      payload.currentPassword,
      fetchedUser?.password as string,
    ))
  ) {
    throw new AppError(
      '',
      'Current Password doest not match!',
      httpStatus.CONFLICT,
    );
  }

  //checking current password conflict with new password
  if (
    await isPasswordMatch(payload.newPassword, fetchedUser?.password as string)
  ) {
    throw new AppError(
      '',
      'Current password and new password should not be same.',
      httpStatus.CONFLICT,
    );
  }

  // checking password history conflict with new password
  if (
    fetchedUser?.passwordHistory &&
    fetchedUser?.passwordHistory?.length > 0
  ) {
    console.log('checking password history conflict with new password');
    const passwordHistory = fetchedUser?.passwordHistory;
    for (const password of passwordHistory) {
      if (await isPasswordMatch(payload.newPassword, password.hash)) {
        throw new AppError(
          '',
          'New password should not be match with your previous 2 password history',
          httpStatus.CONFLICT,
        );
      }
    }
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // remove current password to history based on password history length
    if (
      fetchedUser.passwordHistory.length >=
      Number(config.password_history_length || 2)
    ) {
      console.log('remove current password from history');
      await UserModel.findByIdAndUpdate(
        _id,
        {
          $pop: { passwordHistory: -1 },
        },
        { new: true, runValidators: true, session },
      );
    }

    // add current password to history
    await UserModel.findByIdAndUpdate(
      _id,
      {
        $push: {
          passwordHistory: {
            hash: fetchedUser.password,
            timeStamp: new Date(),
          },
        },
      },
      { new: true, runValidators: true, session },
    );

    // update the new password
    const newPasswordHash = await bcrypt.hash(
      payload.newPassword,
      Number(config.bcrypt_salt_round),
    );
    const result = await UserModel.findByIdAndUpdate(
      _id,
      {
        password: newPasswordHash,
        passwordChangedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    console.log('error when update password', error);
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const AuthService = {
  registerUserIntoDB,
  loginUser,
  changePassword,
};
