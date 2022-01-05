import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthLoginDto } from 'src/dto/auth-login.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UpdatePassDto } from 'src/dto/update-pass.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return await this.authService.register(user);
  }

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'Success!';
  }

  @UseGuards(JwtAuthGuard)
  @Put('updatePass/:id')
  async updateUserPass(@Param('id') id: number, @Body() user: UpdatePassDto) {
    return await this.authService.updatePass(id, user);
  }
}
