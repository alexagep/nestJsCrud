import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from './user.entity';
import { Request } from 'express';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = User.create(createUserDto);
      await user.save();

      delete user.password;
      return user;
    } catch (e) {
      Logger.error(e);
      throw new HttpException('User already exists', 400);
    }
  }
  async showById(id: number): Promise<User> {
    const userId: any = this.request.user;
    if (userId?.id != id) {
      Logger.error(`User ${userId.id} is not authorized to view user ${id}`);
      throw new UnauthorizedException();
    }
    const user = await this.findById(id);

    delete user.password;
    return user;
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userId: any = this.request.user;
    if (userId?.id != id) {
      Logger.error(`User ${userId.id} is not authorized to update user ${id}`);
      throw new UnauthorizedException();
    }

    const oldUserInfo = await this.findById(id);
    user.password = oldUserInfo.password;

    await User.update(id, user);
    return {
      success: true,
      message: 'Successfully updated profile',
    };
  }

  async deleteTodo(id: number): Promise<boolean> {
    const userId: any = this.request.user;
    if (userId?.id != id) {
      Logger.error(`User ${userId.id} is not authorized to view user ${id}`);
      throw new UnauthorizedException();
    }
    await User.delete({ id });
    return true;
  }

  async findById(id: number) {
    return await User.findOne(id);
  }
  async findByMobile(mobile: string) {
    return await User.findOne({ where: { mobile } });
  }
}
