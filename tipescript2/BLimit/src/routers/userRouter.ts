import { Router } from 'express';
import UserController from '../constrollers/UserController';
import { updateUser } from '../dtos/updateUser';
import validate from '../validation/validation';

const userRouter = Router();

userRouter.get('/', UserController.list);
userRouter.get('/:id', UserController.findById);
userRouter.put('/:id', validate(updateUser) , UserController.update);
userRouter.delete('/:id', UserController.delete);

export default userRouter;