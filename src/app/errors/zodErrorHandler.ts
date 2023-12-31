import { ZodError } from 'zod';
import httpStatus from 'http-status-codes';

const zodErrorHandler = (error: ZodError) => {
  let output = '';
  error.issues.forEach(err => {
    const path = err.path[err.path.length - 1];
    if (err.code === 'invalid_type') {
      const isRequired = err.received === 'undefined';
      let message = isRequired ? 'Required' : `must be ${err.expected}`;
      message = `'${path}' is ${message} .`;
      output += message;
    } else {
      output += `'${path}'- ${err.message}. `;
    }
  });
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    errorMessage: output,
    errorDetails: error,
    stack: error.stack,
  };
};

export default zodErrorHandler;
