import { CategoryService } from './category.service';
import sendRequest from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const createCategory = catchAsync(async (req, res) => {
  // console.log('req.body=>', req.body);

  const category = await CategoryService.creteCategoryIntoDB({
    ...req.body,
    createdBy: req.user._id,
  });
  sendRequest(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Category created successfully',
    data: category,
  });
});
const getCategories = catchAsync(async (req, res) => {
  const categories = await CategoryService.getCategoriesFromDB(req.query);
  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories retrieved successfully',
    data: categories,
  });
});

export const CategoryController = {
  createCategory,
  getCategories,
};
