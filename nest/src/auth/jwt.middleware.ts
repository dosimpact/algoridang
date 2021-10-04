import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MemberService } from 'src/member/member.service';
import { JwtService } from './jwt.service';

@Injectable() // Injectable - nestJS
export class JwtMiddleWare implements NestMiddleware<Request, Response> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly memberService: MemberService,
  ) {
    // console.log('this.jwtService', this.jwtService);
    // console.log('this.userService', this.userService);
  }
  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      try {
        const decoded = this.jwtService.verify(token.toString());
        if (typeof decoded === 'object' && decoded.hasOwnProperty('email_id')) {
          const { ok, memberInfo } = await this.memberService.getMemberInfo({
            email_id: decoded['email_id'],
          });
          if (ok) req['memberInfo'] = memberInfo;
        }
      } catch (error) {
        console.log(error);
      }
    }
    next();
  }
}
