import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  private users = [
    {
      name: 'User8',
      age: 78,
      city: 'Lviv',
      id: 'cc34582a-a091-4b53-b940-b3bb69fa1047',
    },
    {
      name: 'User6',
      age: 18,
      city: 'Lviv',
      id: '68e06296-0753-43f2-a0b2-b916494ecac1',
    },
    {
      name: 'User1',
      age: 22,
      city: 'Lviv',
      id: '2e1d4fad-b0d3-4d51-a525-5786cb12d12c',
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async getAllUsers() {
    return this.users;
  }
  async createUserAccount(data) {
    const id = v4();
    return this.users.push({ id: id, ...data });
  }

  async getOneUserAccount(userId: string) {
    const user = this.users.find((item) => item.id === userId);
    return user;
  }

  async deleteUserAccount(userId: string) {
    const user = this.users.find((item) => item.id === userId);
    const i = this.users.indexOf(user);
    return this.users.splice(i, 1);
  }

  async updateUserAccount(userId: string, data) {
    const user = this.users.find((item) => item.id === userId);
    console.log(data);
    const obj = Object.keys(data).toString();
    Object.keys(user).forEach((item) => {
      if (item === obj) {
        user[item] = data[obj];
      }
    });
    return user;
  }
}
