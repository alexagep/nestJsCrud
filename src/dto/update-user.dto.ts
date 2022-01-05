import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { UpdateDateColumn } from 'typeorm';

export class UpdateUserDto {
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
