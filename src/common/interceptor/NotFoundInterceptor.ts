import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
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
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // next.handle() is an Observable of the controller's result value
    return next.handle().pipe(
      catchError((error) => {
        console.log('NotFoundInterceptor 작동');
        if (error instanceof EntityNotFoundError) {
          // throw new HttpException(error.message, HttpStatus.NOT_FOUND);
          throw new NotFoundException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
