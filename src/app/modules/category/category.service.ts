import { TCategory } from './category.interface';
import { CategoryModel } from './category.model';

const creteCategoryIntoDB = async (payload: TCategory) => {
  const result = await CategoryModel.create(payload);

  return result;
};
const getCategoriesFromDB = async (query: Record<string, unknown>) => {
  const result = await CategoryModel.find(query).populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt',
  });
  return result;
};

export const CategoryService = {
  creteCategoryIntoDB,
  getCategoriesFromDB,
};
