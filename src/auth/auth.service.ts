import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from 'src/dto/auth-login.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdatePassDto } from 'src/dto/update-pass.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @Inject(REQUEST)
    private readonly request,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.rePassword) {
      return {
        errorCode: 500,
        message: 'passwords are not match',
      };
    }

    if (createUserDto.age > 80) {
      return {
        errorCode: 500,
        message: 'age must be lower than 80',
      };
    }

    const user = await this.usersService.create(createUserDto);

    return {
      id: user.id,
      name: user.name,
      age: user.age,
      mobile: user.mobile,
    };
  }

  async login(authLoginDto: AuthLoginDto) {
    Logger.log(authLoginDto);
    const user = await this.validateUser(authLoginDto);
    const payload = {
      userId: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async updatePass(id: number, user: UpdatePassDto) {
    const userId: any = this.request.user;

    if (userId?.id != id) {
      Logger.error(`User ${userId.id} is not authorized to update user ${id}`);
      throw new UnauthorizedException();
    }
    if (user.password !== user.rePassword) {
      return {
        errorCode: 500,
        message: 'passwords are not match',
      };
    }

    const userInfo = await this.findById(id);

    user.password = await bcrypt.hash(user.password, 8);

    userInfo.password = user.password;
    User.save(userInfo);
    return {
      success: true,
      message: 'Password updated Successfully',
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { mobile, password } = authLoginDto;

    const user = await this.usersService.findByMobile(mobile);

    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async findById(id: number) {
    return await User.findOne(id);
  }
}
