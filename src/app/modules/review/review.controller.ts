import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewService } from './review.service';
import httpStatus from 'http-status-codes';

const createReview = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await ReviewService.createReviewIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Review created successfully',
    data: result,
  });
});
const getReviews = catchAsync(async (req, res) => {
  const result = await ReviewService.getReviewsFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Review retrieve successfully',
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getReviews,
};
