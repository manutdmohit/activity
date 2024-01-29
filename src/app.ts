import dotenv from 'dotenv';
import 'express-async-errors';
import express, { Request, Response } from 'express';

import activityRouter from './routes/activityRoutes';
import connectDB from './db/connectDB';
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Homepage');
});

// Mount the routers
app.use('/api/v1/activities', activityRouter);

// Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const MONGO_URI: string | undefined = process.env.MONGO_URI;

const start = async () => {
  if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in the environment variables');

    return;
  }

  await connectDB(MONGO_URI);

  app.listen(PORT, () =>
    console.log(`The server is listening on the port ${PORT}`)
  );
};

start();
