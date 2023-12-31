/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { AppError } from '../errors/AppError';
import zodErrorHandler from '../errors/zodErrorHandler';
import castErrorHandler from '../errors/castErrorHandler';
import config from '../config';
import duplicateKeyErrorHandler from '../errors/duplicateKeyErrorHandler';
import { JsonWebTokenError } from 'jsonwebtoken';
import jwtErrorHandler from '../errors/jwtErrorHandler';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log('Global Error Handler=>', error);
  let statusCode: number = 500;
  let message: string = 'Internal Server Error';
  let errorMessage: string = 'Something went wrong!';
  let errorDetails: Record<string, any> = {};
  let stack: unknown = '';

  if (error instanceof AppError) {
    // app error handling
    statusCode = error.statusCode;
    message = error.message;
    errorMessage = error.errorMessage;
    errorDetails = error.errorDetails;
    stack = error.stack;
  } else if (error instanceof ZodError) {
    // zod error handling
    const errorSimplified = zodErrorHandler(error);
    statusCode = errorSimplified.statusCode;
    message = errorSimplified.message;
    errorMessage = errorSimplified.errorMessage;
    errorDetails = errorSimplified.errorDetails;
    stack = errorSimplified.stack;
  } else if (error instanceof mongoose.Error.CastError) {
    // mongoose cast handling
    const errorSimplified = castErrorHandler(error);
    statusCode = errorSimplified.statusCode;
    message = errorSimplified.message;
    errorMessage = errorSimplified.errorMessage;
    errorDetails = errorSimplified.errorDetails;
    stack = errorSimplified.stack;
    stack = error.stack;
  } else if (error.code && error.code === 11000) {
    // mongoose duplication error handling
    const errorSimplified = duplicateKeyErrorHandler(error);
    statusCode = errorSimplified.statusCode;
    message = errorSimplified.message;
    errorMessage = errorSimplified.errorMessage;
    errorDetails = errorSimplified.errorDetails;
    stack = errorSimplified.stack;
    stack = error.stack;
  } else if (error instanceof JsonWebTokenError) {
    const errorSimplified = jwtErrorHandler(error);
    statusCode = errorSimplified.statusCode;
    message = errorSimplified.message;
    errorMessage = errorSimplified.errorMessage;
    errorDetails = errorSimplified.errorDetails;
    stack = errorSimplified.stack;
    stack = error.stack;
  } else {
    // other error handling
    message = 'Unknown Error';
    errorDetails = error;
  }
  res.status(statusCode).json({
    statusCode,
    message,
    errorMessage,
    errorDetails,
    stack: config.node_env === 'development' ? stack : null,
  });
};

export default globalErrorHandler;
