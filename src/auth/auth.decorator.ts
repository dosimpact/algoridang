import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { MemberInfo } from 'src/member/entities';
import { UserRole } from 'src/member/entities/member-info.entity';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): MemberInfo => {
    if (
      context['contextType'] &&
      String(context['contextType']).startsWith('http')
    ) {
      const request = context.switchToHttp().getRequest();
      return request['memberInfo'];
    }
  },
);

export type AllowRoles = keyof typeof UserRole | 'Any';
export const Roles = (roles: AllowRoles[]) => SetMetadata('roles', roles);
