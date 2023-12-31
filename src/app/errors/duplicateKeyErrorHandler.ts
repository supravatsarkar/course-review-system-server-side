/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status-codes';
const duplicateKeyErrorHandler = (error: any) => {
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    // errorMessage: `${Object.keys(error.keyValue)[0]}'s value ${
    //   Object.values(error.keyValue)[0]
    // } is already exist`,
    errorMessage: `'${Object.values(error.keyValue)[0]}' is already exist.`,
    errorDetails: error,
    stack: error.stack,
  };
};

export default duplicateKeyErrorHandler;
