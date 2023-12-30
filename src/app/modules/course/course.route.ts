import { Router } from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
const router = Router();

router.post(
  '/',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);
router.get(
  '/',
  validateRequest(CourseValidation.getCoursesValidationSchema),
  CourseController.getCourses,
);
router.put(
  '/:courseId',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);
router.get('/:courseId/reviews', CourseController.getCourseWithReview);
router.get('/best', CourseController.getBestCourseWithAverageReviewCount);

export const CourseRouter = router;
