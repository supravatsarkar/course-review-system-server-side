import { Error } from 'mongoose';
import httpStatus from 'http-status-codes';

const castErrorHandler = (error: Error.CastError) => {
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Invalid ID',
    errorMessage: `${error.value} is not a valid ID!`,
    errorDetails: error,
    stack: error.stack,
  };
};

export default castErrorHandler;
