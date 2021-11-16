import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityColumnNotFound, EntityNotFoundError } from 'typeorm';
import { AlreadyExistError, PasswordWrongError } from '../error/Custom-Error';
import { AxiosError } from 'axios';

function instanceOfAxiosError(object: any): object is AxiosError {
  return 'config' in object && 'isAxiosError' in object;
}

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
        if (instanceOfAxiosError(error)) {
          const e = error as AxiosError;
          if (e.response) {
            if (e.code === '500') {
              this.logger.error(`❌️ DA Server internal Error `);
              throw new InternalServerErrorException(e.message);
            }
          } else {
            this.logger.error(`❌️ DA Server is not connected`);
            throw new InternalServerErrorException(e.message);
          }
        }

        if (error instanceof EntityNotFoundError) {
          throw new NotFoundException(error.message);
        } else if (error instanceof EntityColumnNotFound) {
          throw new NotFoundException(error.message);
        } else if (error instanceof PasswordWrongError) {
          throw new UnauthorizedException(error.message);
        } else if (error instanceof AlreadyExistError) {
          throw new BadRequestException(error.message);
        } else {
          // 500 애러는 숨기는것이 맞는지 모르겠다.
          this.logger.error(error.message, error.stack);
          // 500 애러에 , 서버 오류 메시지도 (dev환경) 보내주기
          // throw new InternalServerErrorException(error.message);
          // ⚠ validation pipe 애러를 전달하기 위함..
          throw error;
        }
      }),
    );
  }
}
