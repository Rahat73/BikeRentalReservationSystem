import { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import router from './app/routes';

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get('/test', async (req: Request, res: Response) => {
  const test = 'Welcome to the Bike Rental Reservation System';
  res.send(test);
});

export default app;
