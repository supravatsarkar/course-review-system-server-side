import { Router } from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.const';
const router = Router();

router.post(
  '/',
  auth(USER_ROLES.admin),
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
  auth(USER_ROLES.admin),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);
router.get('/:courseId/reviews', CourseController.getCourseWithReview);
router.get('/best', CourseController.getBestCourseWithAverageReviewCount);

export const CourseRouter = router;
