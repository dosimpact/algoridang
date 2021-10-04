import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import { IsNumber, IsOptional, IsString } from 'class-validator';

class PostHelloInput {
  @IsNumber()
  num: number;
  @IsString()
  @IsOptional()
  str?: string;
}

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    // throw new HttpException('banana BAD_REQUEST', HttpStatus.BAD_REQUEST);
    // throw new HttpException('banana Forbidden', HttpStatus.FORBIDDEN);
    return '✔ Server is running';
  }

  @Version('1')
  @Post('/api')
  postHello(@Body() body: PostHelloInput) {
    console.log(body);
    return { ok: `ok! ${JSON.stringify(body)}`, num: 1 };
  }
}
