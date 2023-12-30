import express, { Application, Request, Response } from 'express';
import requestLog from './middlewares/requestLog';
import router from './router';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorHandler';
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//request log check
app.use(requestLog);

// test route
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Server Running..',
    data: null,
  });
});

// main app routes
app.use('/api', router);

// not found routes handling
app.use('*', notFound);

// global error handling
app.use(globalErrorHandler);

export default app;
