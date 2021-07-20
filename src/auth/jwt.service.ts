import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS, JwtModuleOptions } from './jwt.interface';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly option: JwtModuleOptions,
  ) {}

  sign(payload: Record<string, unknown>): string {
    return jwt.sign(payload, this.option.privateKey);
  }
  verify(token: string): string | object {
    return jwt.verify(token, this.option.privateKey);
  }
}
