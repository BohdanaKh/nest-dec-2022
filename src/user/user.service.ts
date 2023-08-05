import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  private salt = 5;
  // private users = [
  //   {
  //     name: 'User8',
  //     age: 78,
  //     city: 'Lviv',
  //     id: 'cc34582a-a091-4b53-b940-b3bb69fa1047',
  //   },
  //   {
  //     name: 'User6',
  //     age: 18,
  //     city: 'Lviv',
  //     id: '68e06296-0753-43f2-a0b2-b916494ecac1',
  //   },
  //   {
  //     name: 'User1',
  //     age: 22,
  //     city: 'Lviv',
  //     id: '2e1d4fad-b0d3-4d51-a525-5786cb12d12c',
  //   },
  // ];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
  async createUser(data: UserCreateDto) {
    const findUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (findUser) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    data.password = await this.getHash(data.password);
    const newUser = this.userRepository.create(data);

    // const id = v4();
    // const newUser = this.userRepository.create({ id: id, ...data });
    // newUser.lastLogin = '12-07-2023';
    // await newUser.save();
    await this.userRepository.save(newUser);
    const token = await this.singIn(newUser);

    return { token };
  }

  async getOneUserAccount(userId: string) {
    // const user = this.users.find((item) => item.id === userId);
    // return user;
    const user = this.userRepository.findOne({ where: { id: userId } });
    return user;
  }

  async deleteUserAccount(userId: string) {
    // const user = this.users.find((item) => item.id === userId);
    // const i = this.users.indexOf(user);
    // return this.users.splice(i, 1);
    await this.userRepository.delete(userId);
  }

  // async updateUserAccount(userId: string, data: UserCreateDto): Promise<User> {
  // const user = this.users.find((item) => item.id === userId);
  // const obj = Object.keys(data).toString();
  // Object.keys(user).forEach((item) => {
  //   if (item === obj) {
  //     user[item] = data[obj];
  //   }
  // });
  // return user;
  //   await this.userRepository.findOne({ where: { id: userId } });
  //   const updatedUser = await this.userRepository.update({ ...data });
  //   return updatedUser;
  // }

  async getHash(password: string) {
    return await bcrypt.hash(password, this.salt);
  }

  async singIn(user) {
    return await this.authService.signIn({
      id: user.id.toString(),
    });
  }
}
