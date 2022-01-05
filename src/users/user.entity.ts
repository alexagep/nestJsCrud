import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {InternalServerErrorException} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Logger } from '@nestjs/common';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  mobile: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 8);
    } catch (e) {
      throw new Error('There are some wrong in the hash');
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    Logger.log(password);
    Logger.log(this.password);
    return bcrypt.compareSync(password, this.password);
  }
}
