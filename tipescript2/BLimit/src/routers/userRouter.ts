import { Router } from 'express';
import UserController from '../constrollers/UserController';
import validate from '../validation/validation';
import { createdUser } from '../dtos/createdUser';

const userRouter = Router();

userRouter.post('/', validate(createdUser), UserController.register);
userRouter.get('/', UserController.list);
userRouter.get('/:id', UserController.findById);
userRouter.delete('/:id', UserController.delete);

export default userRouter;