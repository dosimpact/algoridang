import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    // throw new HttpException('banana BAD_REQUEST', HttpStatus.BAD_REQUEST);
    // throw new HttpException('banana Forbidden', HttpStatus.FORBIDDEN);
    return '✔ Server is running';
  }
}
