import { Request, Response, NextFunction } from 'express';
import UserService from '../servers/userService';

class UserController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.list();
      return res.status(200).json(users);
    }  catch (error) {
      next(error);
    }
  }

  static async findById(req: Request, res: Response,  next: NextFunction) {
    try {
      const user = await UserService.findById(req.params.id);
      if (!user)
        return res.status(404).json({message: 'User not found'});
      return res.status(200).json(user);
    } catch(error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response,  next: NextFunction) {
    try{
      const id = req.params.id;
      const {name, email} = req.body;
      await UserService.update(id, name, email);
      return res.status(204).send('successful update');
    } catch(error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response,  next: NextFunction) {
    try {
      const id = req.params.id;
      await UserService.delete(id);
      res.status(204).send('successful deletion');
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;