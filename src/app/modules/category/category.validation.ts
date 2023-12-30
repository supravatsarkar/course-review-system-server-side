import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Category name must be required',
        invalid_type_error: 'Category name must be a string',
      })
      .trim(),
  }),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
};
