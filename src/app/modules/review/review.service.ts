import { AppError } from '../../errors/AppError';
import { CourseModel } from '../course/course.model';
import { TReview } from './review.interface';
import httpStatus from 'http-status-codes';
import { ReviewModel } from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
  // checking course existing
  const isCourseExist = await CourseModel.findById(payload.courseId);
  if (!isCourseExist) {
    throw new AppError('', 'Course does not exit!', httpStatus.BAD_REQUEST);
  }
  return await ReviewModel.create(payload);
};
const getReviewsFromDB = async (query: Record<string, unknown>) => {
  // return await ReviewModel.find(query).populate('courseId');
  return await ReviewModel.find(query);
};

export const ReviewService = {
  createReviewIntoDB,
  getReviewsFromDB,
};
