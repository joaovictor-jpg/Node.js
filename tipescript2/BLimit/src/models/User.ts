import { randomUUID } from 'crypto';

export default class User {
  private readonly id: string;
  private name: string;
  private email: string;
  private readonly password: string;
  private readonly createAt: Date;
  private deleteAt?: Date;

  constructor(name: string, email: string, password: string) {
    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.createAt = new Date();
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  delete(): void {
    this.deleteAt = new Date();
  }

  getDeleteHours(): Date | undefined {
    return this.deleteAt;
  }

  update(name: string, email: string) {
    if (name !== undefined) {
      this.name = name;
    }

    if (email !== undefined) {
      this.email = email;
    }
  }
}