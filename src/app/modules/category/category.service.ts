import { TCategory } from './category.interface';
import { CategoryModel } from './category.model';

const creteCategoryIntoDB = async (payload: TCategory) => {
  const result: TCategory & {
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
  } = (await CategoryModel.create(payload)).toJSON();

  // delete unnecessary field from result
  delete result?.__v;
  delete result?.createdAt;
  delete result?.updatedAt;
  return result;
};
const getCategoriesFromDB = async (query: Record<string, unknown>) => {
  const result = await CategoryModel.find(query);
  return result;
};

export const CategoryService = {
  creteCategoryIntoDB,
  getCategoriesFromDB,
};
