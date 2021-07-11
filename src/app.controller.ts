import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor() {
    
  }

  @Get()
  getHello(): string {
    return 'Hello World!~~';
  }
}
