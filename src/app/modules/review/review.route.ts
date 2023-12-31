import express from 'express';
import { ReviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.const';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLES.user),
  validateRequest(ReviewValidation.createReviewValidationSchema),
  ReviewController.createReview,
);
router.get('/', ReviewController.getReviews);

export const ReviewRoute = router;
