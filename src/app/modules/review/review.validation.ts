import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string(),
    rating: z.number(),
    review: z.string(),
  }),
});

export const ReviewValidation = {
  createReviewValidationSchema,
};
