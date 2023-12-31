/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { Model } from 'mongoose';
import { USER_ROLES } from './user.const';

export type TUserRole = keyof typeof USER_ROLES;

export type TPasswordHistory = { hash: string; timeStamp: Date };

export type TUser = {
  username: string;
  email: string;
  password: string;
  passwordChangedAt: Date;
  passwordHistory: TPasswordHistory[];
  role: TUserRole;
};

export interface TUserModel extends Model<TUser> {
  isUserExist(id: string): Promise<TUser> | null;
  findByUsername(username: string): Promise<TUser> | null;
}
