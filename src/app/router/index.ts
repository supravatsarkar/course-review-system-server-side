import { Router } from 'express';
import { CourseRouter } from '../modules/course/course.route';
import { CategoryRouter } from '../modules/category/category.route';
import { ReviewRoute } from '../modules/review/review.route';

const router = Router();

router.use('/courses', CourseRouter);
router.use('/categories', CategoryRouter);
router.use('/reviews', ReviewRoute);

export default router;
