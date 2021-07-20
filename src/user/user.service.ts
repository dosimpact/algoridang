import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { USER } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(USER)
    private readonly userRepo: Repository<USER>,
  ) {}

  async login() {}
  async me() {}

  async createUser() {}
  async updateUser() {}
  async deleteUser() {}
  async getUser() {}
  async getUserList() {}
}
