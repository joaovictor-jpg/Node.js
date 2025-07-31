import { Router } from 'express';
import AuthController from '../constrollers/AuthController';

const authRouter = Router();

authRouter.post('/', AuthController.login);

export default authRouter;