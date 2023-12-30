import { RequestHandler } from 'express';
import { ZodSchema } from 'zod';

const validateRequest = (schema: ZodSchema): RequestHandler => {
  return async (req, res, next) => {
    // console.log({schema})
    try {
      const { body, query } = await schema.parseAsync({
        query: req.query,
        body: req.body,
      });
      req.body = body;
      req.query = query;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
