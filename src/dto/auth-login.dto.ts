import { IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @IsNotEmpty()
  mobile: string;

  @IsNotEmpty()
  password: string;
}
