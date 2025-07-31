import { Router } from 'express';
import AuthController from '../constrollers/AuthController';
import { createdUser } from '../dtos/createdUser';
import validate from '../validation/validation';
import { loginUser } from '../dtos/loginUser';

const authRouter = Router();

authRouter.post('/', validate(loginUser), AuthController.login);
authRouter.post('/', validate(createdUser), AuthController.register);

export default authRouter;