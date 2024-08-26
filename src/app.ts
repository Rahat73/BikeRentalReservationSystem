import { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';

const app: Application = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.use('/api', router);

app.get('/', async (req: Request, res: Response) => {
  const test = 'Welcome to the Bike Rental Reservation System';
  res.send(test);
});

app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
