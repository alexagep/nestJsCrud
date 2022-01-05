import {
  Controller,
  Get,
  Body,
  Put,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  show(@Param('id') id: number) {
    return this.usersService.showById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async userInfo(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.showById(id);
  }

  // Update user information
  @UseGuards(JwtAuthGuard)
  @Put('/update/:id')
  async updateUserInfo(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return await this.usersService.updateUser(id, user);
  }
  // Delete entities
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deleteUserInfo(@Param('id') id: number) {
    return await this.usersService.deleteTodo(id);
  }
}
