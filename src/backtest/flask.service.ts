import { Injectable } from '@nestjs/common';

@Injectable()
export class FlaskService {
  constructor() {
    this.hello();
  }
  async hello() {
    console.log('flask..연동시작.!@#!@#.');
  }
}
