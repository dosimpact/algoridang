import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

// (0) CacheInterceptor : path 만 동일하면 캐슁
// -문제점 : querystring이 다르면 다른요청이 와야하는데, 그렇지 못함

// default : 해당 비즈니스 서버만 사용하는 redis캐시에 적용
// (1) 캐시정책 : originalUrl (Params/query) 이 동일하면 캐슁
@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    return request.originalUrl;
  }
}

// (2) 캐시정책 : protocol://hostname+originalUrl 이 동일하면 캐슁
@Injectable()
export class HttpHostCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    return request.protocol + '://' + request.hostname + request.originalUrl;
  }
}

// (Deprecated) POST 요청을 캐시한다는것은 - 비즈니스로직 접근을 막겠다는 뜻 ( 모순 )
// (3) 캐시정책 : originalUrl (Params/query) + Body 동일하면 캐슁
@Injectable()
export class HttpBodyCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    return request.originalUrl + JSON.stringify(request.body);
  }
}
