import { CourseService } from './course.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';

const createCourse = catchAsync(async (req, res) => {
  const { _id: createdBy } = req.user;
  const course = await CourseService.createCourseIntoDB({
    createdBy,
    ...req.body,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Course created successfully',
    data: course,
  });
});
const getCourses = catchAsync(async (req, res) => {
  const { data, meta } = await CourseService.getCoursesFromDB(req.query);
  // console.log({ data, meta });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses retrieved successfully',
    data,
    meta,
  });
});
const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseService.updateCoursesIntoDB(courseId, req.body);
  // console.log({ data, meta });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course updated successfully',
    data: result,
  });
});
const getCourseWithReview = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseService.getCoursesWithReviewFromDB(courseId);
  // console.log({ data, meta });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  });
});
const getBestCourseWithAverageReviewCount = catchAsync(async (req, res) => {
  const result =
    await CourseService.getBestCourseWithAverageReviewCountFromDB();
  // console.log({ data, meta });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Best course retrieved successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getCourses,
  updateCourse,
  getCourseWithReview,
  getBestCourseWithAverageReviewCount,
};
