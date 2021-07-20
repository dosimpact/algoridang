import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { USER } from 'src/user/entities/user.entity';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): USER => {
    if (
      context['contextType'] &&
      String(context['contextType']).startsWith('http')
    ) {
      const request = context.switchToHttp().getRequest();
      return request['user'];
    }
  },
);
