import {hash, compare } from 'bcryptjs';
import User from '../models/User';
import { create, userByEmail } from '../repositories/UserRepository';
import { sign } from 'jsonwebtoken';
import MyError from '../error/MyError';

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
        console.error(`AuthService Error: The email "${email}" was not found.`);
        throw new MyError(`The email "${email}" was not found.`, 404);
      }

      const isPasswordValid = await compare(password, user.getPassword());

      if (!isPasswordValid) {
        throw new MyError('Oops! That email or password doesn’t match our records.', 401);
      }

      const jwtSecret = process.env.JWT_SERCRET;

      if (!jwtSecret) {
        throw new MyError('JWT_SECRET environment variable is not defined.', 500);
      }

      const token = sign({
        id: user.getId(),
        email: user.getEmail()
      }, jwtSecret, {
        expiresIn: '1h'
      });

      return token;

    } catch(error) {
      if (error instanceof MyError) {
        throw error;
      } else if (error instanceof Error) {
        throw new MyError(error.message, 500);
      } else {
        throw new MyError(String(error), 500);
      }
    }
  }
}

export default AuthService;