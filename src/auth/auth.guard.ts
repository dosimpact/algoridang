import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MemberInfo } from 'src/member/entities';
import { AllowRoles } from './auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    // console.log(this.reflector.get<string[]>('roles', context.getHandler()));
    const roles = this.reflector.get<AllowRoles>('roles', context.getHandler());
    // dont' Need Authentication
    // console.log('roles', roles, 'memberInfo', request['memberInfo']);
    if (!roles) {
      return true;
      // Need Authentication
    } else {
      const memberInfo: MemberInfo = request['memberInfo'];
      if (!memberInfo) return false;
      else if (roles.includes('Any')) return true;
      else return roles.includes(memberInfo.role);
    }

    return true;
    // const request = context.switchToHttp().getRequest<Request>();
    // return request.originalUrl;
  }
}
