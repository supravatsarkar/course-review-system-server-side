import { Request, RequestHandler, Response } from 'express';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status-codes';

const notFound: RequestHandler = (req: Request, res: Response, next) => {
  next(new AppError('Not Found', 'API does not exit', httpStatus.NOT_FOUND));
};

export default notFound;
