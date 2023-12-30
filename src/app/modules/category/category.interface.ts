import { Model, Types } from 'mongoose';

export type TCategory = {
  name: string;
  createdBy: Types.ObjectId;
};

export interface TCategoryModel extends Model<TCategory> {
  isCategoryExist(id: Types.ObjectId): Promise<TCategory> | null;
}
