import { Schema, Types, model } from 'mongoose';
import { TCategory, TCategoryModel } from './category.interface';

const categorySchema = new Schema<TCategory, TCategoryModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    createdBy: {
      type: Schema.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    // timestamps: true,
    versionKey: false,
  },
);

categorySchema.statics.isCategoryExist = async function (id: Types.ObjectId) {
  return await CategoryModel.findById(id);
};

export const CategoryModel = model<TCategory, TCategoryModel>(
  'Category',
  categorySchema,
);
