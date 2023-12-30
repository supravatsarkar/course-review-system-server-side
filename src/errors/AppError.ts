export class AppError extends Error {
  public statusCode: number;
  public errorMessage: string;
  public errorDetails: Record<string, unknown>;
  constructor(
    message: string = 'Validation Error',
    errorMessage: string,
    statusCode: number,
    errorDetails: Record<string, unknown> = {},
    stack: string = '',
  ) {
    super(message);
    this.message = message || 'Validation Error';
    this.errorMessage = errorMessage;
    this.errorDetails = errorDetails;
    this.statusCode = statusCode;
    this.stack = stack || this.stack;
  }
}
