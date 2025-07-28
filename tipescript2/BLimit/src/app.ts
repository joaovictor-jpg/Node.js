import express, {Request, Response} from 'express';
import userRouter from './routers/userRouter';

const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message:'Hello World'});
});

export default app;