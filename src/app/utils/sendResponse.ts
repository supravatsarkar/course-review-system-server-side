import { Response } from 'express';
import { TResponseObject } from '../interface';

const sendResponse = (
  res: Response,
  { success, statusCode, message, data, meta }: TResponseObject,
) => {
  const httpStatusCode = statusCode || 200;
  const responseObj = {
    success,
    statusCode: httpStatusCode,
    message: message || 'Execution successful',
    meta,
    data: data || null,
  };
  if (!meta) {
    delete responseObj.meta;
  }
  res.status(statusCode).json(responseObj);
};

export default sendResponse;
