import User from '../models/User';

const users: User[] = [];

async function create(user: User): Promise<User> {
  return new Promise((resolve, rejects) => {
    const existingUser = users.find(u => u.getEmail() === user.getEmail());

    if (existingUser)
      return rejects(new Error(`email: ${user.getEmail()} is already in use`));

    users.push(user);
    return resolve(user);
  });
}

async function list(): Promise<User[]> {
  return new Promise((resolve) => {
    return resolve(users);
  });
}

async function userById(id: string): Promise<User | undefined> {
  return new Promise((resolve) => {
    return resolve(users.find(u => u.getId() === id));
  });
}

async function userByEmail(email:string): Promise<User | undefined> {
  return new Promise((resolve, rejects) => {
    const user = users.find(u => u.getEmail() === email);

    if (!user)
      return rejects(new Error(`The email "${email}" was not found.`));

    return resolve(user);
  });
}

async function update(id: string, name: string, email: string) {
  const user = users.find(u => u.getId() === id);
  if (!user) {
    throw new Error('User not found');
  }
  user.update(name, email);
}

async function deleteById(id: string) {
  const index = users.findIndex(u => u.getId() === id);

  if (index === 1) {
    throw new Error('User not found');
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

