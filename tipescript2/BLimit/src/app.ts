import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import userRouter from './routers/userRouter';
import authRouter from './routers/auhtRouter';
import authenctication from './middleware/authenticated';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', authenctication, userRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message:'Hello World'});
});

export default app;