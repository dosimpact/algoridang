import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityNotFoundError } from 'typeorm';

// reference
// https://docs.nestjs.com/interceptors#exception-mapping
// https://stackoverflow.com/questions/51112952/what-is-the-nestjs-error-handling-approach-business-logic-error-vs-http-error
@Injectable()
export class ErrorHandlerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // next.handle() is an Observable of the controller's result value
    return next.handle().pipe(
      catchError((error) => {
        console.log('NotFoundInterceptor 작동');
        if (error instanceof EntityNotFoundError) {
          // throw new HttpException(error.message, HttpStatus.NOT_FOUND);
          throw new NotFoundException(error.message);
        } else {
          // 500 애러는 숨기는것이 맞는지 모르겠다.
          throw new InternalServerErrorException(error.message);
        }
      }),
    );
  }
}
