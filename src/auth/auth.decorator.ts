import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MemberInfo } from 'src/member/entities';

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
