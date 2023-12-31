import { Schema, model } from 'mongoose';
import { TPasswordHistory, TUser, TUserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { USER_ROLES } from './user.const';

const passwordHistorySchema = new Schema<TPasswordHistory>({
  hash: { type: String, required: true },
  timeStamp: { type: Date, required: true },
});

const userSchema = new Schema<TUser, TUserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
      select: 0,
      default: null,
    },
    passwordHistory: {
      type: [passwordHistorySchema],
      default: [],
      select: 0,
    },
    role: {
      type: String,
      required: true,
      enum: [...Object.values(USER_ROLES)],
      default: USER_ROLES.user,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
});

userSchema.statics.isUserExist = function (id: string) {
  return this.findById(id).select(
    '+password +passwordChangedAt +passwordHistory',
  );
};
userSchema.statics.findByUsername = function (username: string) {
  return this.findOne({ username }).select(
    '+password +passwordChangedAt +passwordHistory',
  );
};

const UserModel = model<TUser, TUserModel>('User', userSchema);

export default UserModel;
