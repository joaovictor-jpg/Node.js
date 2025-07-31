import { Request, Response } from 'express';
import AuthService from '../serves/authService';

class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const newUser = await AuthService.registerUser(req.body.name, req.body.email, req.body.password);
      return res.status(201).json(newUser);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json(message);
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      return res.status(200).json({ token: token });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({ message: message });
    }
  }
}


export default AuthController;