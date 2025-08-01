import MyError from '../error/MyError';
import User from '../models/User';

const users: User[] = [];

async function create(user: User): Promise<User> {
  return new Promise((resolve, rejects) => {
    const existingUser = users.find(u => u.getEmail() === user.getEmail());

    if (existingUser)
      return rejects(new MyError(`email: ${user.getEmail()} is already in use`, 400));

    users.push(user);
    return resolve(user);
  });
}

async function list(): Promise<User[]> {
  return new Promise((resolve) => {
    return resolve(users);
  });
}

async function userById(id: string): Promise<User | MyError> {
  return new Promise((resolve) => {
    const user = users.find(u => u.getId() === id);

    if (!user)
      return resolve(new MyError(`The user with id "${id}" was not found.`, 404));

    return resolve(user);
  });
}

async function userByEmail(email:string): Promise<User> {
  return new Promise((resolve, rejects) => {
    const user = users.find(u => u.getEmail() === email);

    if (!user)
      return rejects(new MyError(`The email "${email}" was not found.`, 404));

    return resolve(user);
  });
}

async function update(id: string, name: string, email: string) {
  const user = users.find(u => u.getId() === id);
  if (!user) {
    throw new MyError('User not found', 404);
  }
  user.update(name, email);
}

async function deleteById(id: string) {
  const index = users.findIndex(u => u.getId() === id);

  if (index === 1) {
    throw new MyError('User not found', 404);
  }

  const userForDelete = users[index];

  userForDelete?.delete();
}

export {
  create,
  list,
  userById,
  deleteById,
  update,
  userByEmail
};

