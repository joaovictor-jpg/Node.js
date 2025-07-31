import dotenv from 'dotenv';
import express from 'express';
import userRouter from './routers/userRouter';
import authRouter from './routers/auhtRouter';
import authenctication from './middleware/authenticated';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', authenctication, userRouter);
app.use(errorHandler);

export default app;