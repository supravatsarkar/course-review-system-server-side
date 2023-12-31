/* eslint-disable @typescript-eslint/no-explicit-any */
export class AppError extends Error {
  public statusCode: number;
  public errorMessage: string;
  public errorDetails: Record<string, unknown>;
  public stack: any;
  constructor(
    message: string = 'Validation Error',
    errorMessage: string,
    statusCode: number,
    errorDetails: any = {},
    stack: any = '',
  ) {
    super(message);
    this.message = message || 'Validation Error';
    this.errorMessage = errorMessage;
    this.errorDetails = errorDetails;
    this.statusCode = statusCode;
    this.stack = stack === null ? null : this.stack;
  }
}
