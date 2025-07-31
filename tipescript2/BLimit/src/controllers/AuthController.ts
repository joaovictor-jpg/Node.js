import { Request, Response, NextFunction } from 'express';
import AuthService from '../servers/authService';

class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await AuthService.registerUser(req.body.name, req.body.email, req.body.password);
      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      return res.status(200).json({ token: token });
    } catch (error) {
      next(error);
    }
  }
}


export default AuthController;