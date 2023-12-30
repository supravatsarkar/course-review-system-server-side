import { Router } from 'express';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.get('/', CategoryController.getCategories);
router.post(
  '/',
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryController.createCategory,
);

export const CategoryRouter = router;
