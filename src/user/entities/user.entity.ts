import { IsEmail, IsNumber, IsString } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { InputType, ObjectType } from '@nestjs/graphql';

@InputType('USERInput', { isAbstract: true })
@ObjectType()
@Entity()
export class USER {
  @IsNumber()
  @PrimaryGeneratedColumn()
  ID: number;

  @IsString()
  @IsEmail()
  @Column({ unique: true })
  EMAIL: string;

  @IsString()
  @Column({ nullable: true })
  NAME: string;

  @IsString()
  @Column()
  PASSWORD: string;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    if (this.PASSWORD) {
      try {
        this.PASSWORD = await bcrypt.hash(this.PASSWORD, 10);
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string) {
    try {
      const ok = await bcrypt.compare(aPassword, this.PASSWORD);
      return ok;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
