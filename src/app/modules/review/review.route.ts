import express from 'express';
import { ReviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ReviewValidation.createReviewValidationSchema),
  ReviewController.createReview,
);
router.get('/', ReviewController.getReviews);

export const ReviewRoute = router;
