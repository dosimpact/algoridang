import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { LoginUserInput } from './dtos/query.dtos';
import { UserService } from './user.service';

@Controller('api/user/')
export class UserController {
  constructor(
    @Inject(UserService.name)
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async loginUser(@Body() loginUserInput: LoginUserInput) {
    return this.userService.loginUser(loginUserInput);
  }
  async me() {
    return this.userService.me();
  }
  async createUser() {
    return this.userService.createUser();
  }
  async updateUser() {
    return this.userService.updateUser();
  }
  async deleteUser() {
    return this.userService.deleteUser();
  }
  async getUser() {
    return this.userService.getUser();
  }
  async getUserList() {
    return this.userService.getUserList();
  }
}
