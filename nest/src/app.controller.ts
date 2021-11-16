import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Controller()
export class AppController {
  private readonly dataServerUrl: string;
  constructor(private readonly configService: ConfigService) {
    this.dataServerUrl = this.configService.get('DATA_SERVER_URL');
  }

  @Get()
  getHello(): string {
    // throw new HttpException('banana BAD_REQUEST', HttpStatus.BAD_REQUEST);
    // throw new HttpException('banana Forbidden', HttpStatus.FORBIDDEN);
    return '✔ Server is running';
  }

  @Version('1')
  @Get('/api')
  async healthCheck_NestJS() {
    return '✔ NestJS Server is running';
  }

  @Version('1')
  @Get('/api/flask')
  async healthCheck_FlaskServer() {
    const { status } = await axios({
      method: 'get',
      url: `${this.dataServerUrl}`,
      timeout: 5000,
    });

    if (status === 200) return '✔ Flask Server is running';
    else
      throw new HttpException(
        '❌ Flask Server is not connected',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
}
