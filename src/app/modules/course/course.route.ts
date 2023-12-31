import { Router } from 'express';
import { CourseController } from './course.controller';

const router = Router();
router.get('/best', CourseController.getBestCourseWithAverageReviewCount);

export const CourseRouter = router;
