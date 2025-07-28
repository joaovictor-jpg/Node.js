import { Request, Response } from 'express';
import AuthService from '../serves/authService';
import UserService from '../serves/userService';

class UserController {
  static async register(req: Request, res: Response) {
    try {
      const newUser = await AuthService.registerUser(req.body.name, req.body.email, req.body.password);
      return res.status(201).json(newUser);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json(message);
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const users = await UserService.list();
      return res.status(200).json(users);
    }  catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json(message);
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const user = await UserService.findById(req.params.id);
      if (!user)
        return res.status(404).json({message: 'User not found'});
      return res.status(200).json(user);
    } catch(error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({ message: message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await UserService.delete(id);
      res.status(204).send('successful deletion');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({ message: message });
    }
  }
}

export default UserController;