import {hash, compare } from 'bcryptjs';
import User from '../models/User';
import { create, userByEmail } from '../repositories/UserRepository';
import { sign } from 'jsonwebtoken';

class AuthService {
  static async registerUser(name: string, email: string, password: string): Promise<User | undefined> {
    try {
      const securePassword = await hash(password, 10);
      const user = new User(name, email, securePassword);
      return await create(user);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(String(error));
      }
    }
  }

  static async login(email: string, password: string): Promise<string> {
    try{
      const user = await userByEmail(email);

      if (!user) {
        throw new Error(`The email "${email}" was not found.`);
      }

      const isPasswordValid = await compare(password, user.getPassword());

      if (!isPasswordValid) {
        throw new Error('Oops! That email or password doesn’t match our records.');
      }

      const jwtSecret = process.env.JWT_SERCRET;

      if (!jwtSecret) {
        throw new Error('JWT_SECRET environment variable is not defined.');
      }

      const token = sign({
        id: user.getId(),
        email: user.getEmail()
      }, jwtSecret, {
        expiresIn: '1h'
      });

      return token;

    } catch(error) {
      if (error instanceof Error) {
        throw new Error('Erro ao realizar login: ' + error.message);
      } else {
        throw new Error('Erro ao realizar login: ' + String(error));
      }
    }
  }
}

export default AuthService;