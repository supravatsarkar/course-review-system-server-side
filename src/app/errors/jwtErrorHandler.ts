import { JsonWebTokenError } from 'jsonwebtoken';
import httpStatus from 'http-status-codes';

const jwtErrorHandler = (error: JsonWebTokenError) => {
  return {
    statusCode: httpStatus.UNAUTHORIZED,
    message: 'Unauthorized Access',
    errorMessage:
      'You do not have the necessary permissions to access this resource.',
    errorDetails: error,
    stack: error.stack,
  };
};

export default jwtErrorHandler;
