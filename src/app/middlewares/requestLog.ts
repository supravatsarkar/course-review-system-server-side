import { RequestHandler } from 'express';
const requestLog: RequestHandler = (req, res, next) => {
  console.log('INCOMING REQUEST====>', req.url);
  console.log({ BODY: req.body });
  console.log({ QUERY: req.query });
  next();
};

export default requestLog;
