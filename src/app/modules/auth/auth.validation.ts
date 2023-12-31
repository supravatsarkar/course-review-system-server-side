import { z } from 'zod';
import { USER_ROLES } from '../user/user.const';

//Password will be follow the bellow criteria
// -Minimum length of 8 characters.
// -At least one uppercase letter.
// -At least one special character.
// -At least one digit.
const passwordRegexValidationSchema = z
  .string()
  .max(20)
  .min(8)
  .refine(
    password => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
      return passwordRegex.test(password);
    },
    {
      message:
        'Password mast be follow -At least one uppercase letter.-At least one special character within [!@#$%^&*]. -At least one digit.',
    },
  );

const registerValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string().email(),
    password: passwordRegexValidationSchema,
    role: z
      .enum([...Object.values(USER_ROLES)] as [string, ...string[]])
      .optional(),
  }),
});
const loginValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    password: passwordRegexValidationSchema,
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: passwordRegexValidationSchema,
    newPassword: passwordRegexValidationSchema,
  }),
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
};
