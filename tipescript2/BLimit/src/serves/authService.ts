import bcrypt from 'bcryptjs';
import User from '../models/User';
import { create } from '../repositories/UserRepository';

class AuthService {
  static async registerUser(name: string, email: string, password: string): Promise<User | undefined> {
    try {
      const securePassword = await bcrypt.hash(password, 10);
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
}

export default AuthService;