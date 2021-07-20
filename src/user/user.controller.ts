import { Body, Controller, Get, Inject, Post, Request } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth.decorator';
import { GetUserInput, LoginUserInput } from './dtos/query.dtos';
import { UserService } from './user.service';

@Controller('api/user/')
export class UserController {
  constructor(
    @Inject(UserService.name)
    private readonly userService: UserService,
  ) {}

  @Post('loginuser')
  async loginUser(@Body() loginUserInput: LoginUserInput) {
    return this.userService.loginUser(loginUserInput);
  }

  @Get('me')
  async me(@Request() req, @AuthUser() user) {
    // console.log('user', req['user']);
    // console.log('AuthUser', user);
    return user;
    // return this.userService.me();
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
  async getUser(getUserInput: GetUserInput) {
    return this.userService.getUser(getUserInput);
  }
  async getUserList() {
    return this.userService.getUserList();
  }
}
