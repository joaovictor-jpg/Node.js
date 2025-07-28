import User from '../models/User';
import { list, userById, deleteById } from '../repositories/UserRepository';

class UserService {
  static async list(): Promise<User[]> {
    return await list();
  }

  static async findById(id: string): Promise<User | undefined> {
    return await userById(id);
  }

  static async delete(id: string) {
    await deleteById(id);
  }
}

export default UserService;