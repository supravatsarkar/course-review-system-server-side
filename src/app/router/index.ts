import { Router } from 'express';
import { CourseRouter } from '../modules/course/course.route';
import { CategoryRouter } from '../modules/category/category.route';
import { ReviewRoute } from '../modules/review/review.route';
import { AuthRouter } from '../modules/auth/auth.route';

const router = Router();

router.use('/courses', CourseRouter);
router.use('/categories', CategoryRouter);
router.use('/reviews', ReviewRoute);
router.use('/auth', AuthRouter);

export default router;
