import { RequestHandler } from 'express';

const catchAsync = (fn: RequestHandler): RequestHandler => {
  // Promise.resolve(fn(req, res, next)).catch((error)=>next(error))
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
