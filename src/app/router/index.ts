import { Router } from 'express';
import { CoursesRouter } from '../modules/course/courses.route';
import { CategoryRouter } from '../modules/category/category.route';
import { ReviewRoute } from '../modules/review/review.route';
import { AuthRouter } from '../modules/auth/auth.route';
import { CourseRouter } from '../modules/course/course.route';

const router = Router();

router.use('/courses', CoursesRouter);
router.use('/course', CourseRouter);
router.use('/categories', CategoryRouter);
router.use('/reviews', ReviewRoute);
router.use('/auth', AuthRouter);

export default router;
