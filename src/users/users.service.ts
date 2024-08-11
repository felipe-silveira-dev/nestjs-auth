import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  name: string;
  email: string;
  password: string;
};

const users: User[] = [
  {
    userId: 1,
    name: 'Felipe S.',
    email: 'felipes@gmail.com',
    password: 'password',
  },
  {
    userId: 2,
    name: 'Nayara S.',
    email: 'nayaras@gmail.com',
    password: 'password',
  },
];

@Injectable()
export class UsersService {
  async findUserByEmail(email: string): Promise<User | undefined> {
    return users.find((user) => user.email === email);
  }
}
