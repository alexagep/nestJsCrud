import { IsNotEmpty, Matches, MinLength, IsString } from 'class-validator';
import { UpdateDateColumn } from 'typeorm';

export class UpdatePassDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  rePassword: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
