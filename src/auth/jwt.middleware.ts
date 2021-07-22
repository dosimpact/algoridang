import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtService } from './jwt.service';

@Injectable() // Injectable - nestJS
export class JwtMiddleWare implements NestMiddleware<Request, Response> {
  constructor(
    private readonly jwtService: JwtService, // private readonly userService: UserService,
  ) {
    // console.log('this.jwtService', this.jwtService);
    // console.log('this.userService', this.userService);
  }
  async use(req: Request, res: Response, next: NextFunction) {
    // if ('x-jwt' in req.headers) {
    //   const token = req.headers['x-jwt'];
    //   try {
    //     const decoded = this.jwtService.verify(token.toString());
    //     if (typeof decoded === 'object' && decoded.hasOwnProperty('userId')) {
    //       const { ok, user } = await this.userService.getUser({
    //         ID: decoded['userId'],
    //       });
    //       if (ok) req['user'] = user;
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    next();
  }
}
