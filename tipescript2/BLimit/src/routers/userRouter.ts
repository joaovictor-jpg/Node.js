import { Router } from 'express';
import UserController from '../constrollers/UserController';
import validate from '../validation/validation';
import { createdUser } from '../dtos/createdUser';
import { updateUser } from '../dtos/updateUser';

const userRouter = Router();

userRouter.post('/', validate(createdUser), UserController.register);
userRouter.get('/', UserController.list);
userRouter.get('/:id', UserController.findById);
userRouter.put('/:id', validate(updateUser) , UserController.update);
userRouter.delete('/:id', UserController.delete);

export default userRouter;