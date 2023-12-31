import bcrypt from 'bcrypt';

export const isPasswordMatch = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  // console.log({ password, hashPassword });
  return await bcrypt.compare(password, hashPassword);
};

export const isJwtBeforePasswordChangeTimestamp = (
  passwordChangedAt: Date,
  jwtIssueTime: number,
) => {
  return new Date(passwordChangedAt).getTime() / 1000 > jwtIssueTime;
};
