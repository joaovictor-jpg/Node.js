import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import userRouter from './routers/userRouter';
import authRouter from './routers/auhtRouter';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/login', authRouter);
app.use('/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message:'Hello World'});
});

export default app;