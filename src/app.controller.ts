import { Controller, Get } from '@nestjs/common';
import { JwtService } from './auth/jwt.service';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World!~~';
  }
}
