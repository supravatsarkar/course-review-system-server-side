import { Model, Types } from 'mongoose';

export type TCategory = {
  name: string;
};

export interface TCategoryModel extends Model<TCategory> {
  isCategoryExist(id: Types.ObjectId): Promise<TCategory> | null;
}
