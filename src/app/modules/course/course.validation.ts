import { z } from 'zod';
import { SORTBY_FIELDS, SORT_ORDER } from './courser.constance';

const createCourseValidationSchema = z.object({
  body: z
    .object({
      title: z.string().trim(),
      instructor: z.string().trim(),
      categoryId: z.string().trim(),
      price: z.number(),
      tags: z.array(
        z.object({
          name: z.string().trim(),
          isDeleted: z.boolean().optional(),
        }),
      ),
      startDate: z.string().trim(),
      endDate: z.string().trim(),
      language: z.string().trim(),
      provider: z.string().trim(),
      details: z.object({
        level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
        description: z.string().trim(),
      }),
    })
    .strict(),
});
const updateCourseValidationSchema = z.object({
  body: z
    .object({
      title: z.string().trim().optional(),
      instructor: z.string().trim().optional(),
      categoryId: z.string().trim().optional(),
      price: z.number().optional(),
      tags: z
        .array(
          z.object({
            name: z.string().trim(),
            isDeleted: z.boolean(),
          }),
        )
        .optional(),
      startDate: z.string().trim().optional(),
      endDate: z.string().trim().optional(),
      language: z.string().trim().optional(),
      provider: z.string().trim().optional(),
      details: z
        .object({
          level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
          description: z.string().trim().optional(),
        })
        .optional(),
    })
    .strict(),
});

const getCoursesValidationSchema = z.object({
  query: z
    .object({
      page: z.string().optional(),
      limit: z.string().optional(),
      sortBy: z.enum([...SORTBY_FIELDS] as [string, ...string[]]).optional(),
      sortOrder: z
        .enum([...Object.keys(SORT_ORDER)] as [string, ...string[]])
        .optional(),
      minPrice: z.string().optional(),
      maxPrice: z.string().optional(),
      tags: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      language: z.string().optional(),
      provider: z.string().optional(),
      durationInWeeks: z.string().optional(),
      level: z.string().optional(),
    })
    .strict(),
});

export const CourseValidation = {
  createCourseValidationSchema,
  getCoursesValidationSchema,
  updateCourseValidationSchema,
};
