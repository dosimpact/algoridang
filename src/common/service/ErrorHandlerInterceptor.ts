import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityNotFoundError } from 'typeorm';
import { AlreadyExistError, PasswordWrongError } from '../error/Custom-Error';

// reference
// https://docs.nestjs.com/interceptors#exception-mapping
// https://stackoverflow.com/questions/51112952/what-is-the-nestjs-error-handling-approach-business-logic-error-vs-http-error
@Injectable()
export class ErrorHandlerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorHandlerInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // next.handle() is an Observable of the controller's result value
    return next.handle().pipe(
      catchError((error) => {
        // throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        if (error instanceof EntityNotFoundError) {
          throw new NotFoundException(error.message);
        } else if (error instanceof PasswordWrongError) {
          throw new UnauthorizedException(error.message);
        } else if (error instanceof AlreadyExistError) {
          throw new BadRequestException(error.message);
        } else {
          // 500 애러는 숨기는것이 맞는지 모르겠다.
          this.logger.error(error.message, error.stack);
          throw error;
        }
      }),
    );
  }
}
