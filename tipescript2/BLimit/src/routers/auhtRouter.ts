import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { createdUser } from '../DTOs/createdUser';
import validate from '../validation/validation';
import { loginUser } from '../DTOs/loginUser';

const authRouter = Router();

authRouter.post('/register', validate(createdUser), AuthController.register);
authRouter.post('/login', validate(loginUser), AuthController.login);

export default authRouter;