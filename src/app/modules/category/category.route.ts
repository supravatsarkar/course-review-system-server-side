import { Router } from 'express';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';
import validateRequest from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.const';

const router = Router();

router.get('/', CategoryController.getCategories);
router.post(
  '/',
  auth(USER_ROLES.admin),
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryController.createCategory,
);

export const CategoryRouter = router;
