import {
  Body,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UseInterceptors,
  Options,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import {
  HttpBodyCacheInterceptor,
  HttpCacheInterceptor,
} from './common/service/HttpCacheInterceptor';

@UseInterceptors(HttpBodyCacheInterceptor)
@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    const test = async () => {
      // await cacheManager.set('name', 'dodo', { ttl: 1000 });
      console.log(await cacheManager.get('name'));
      console.log(await cacheManager.del('name'));
      console.log(await cacheManager.get('name'));
    };
    // test();
  }

  @Options()
  @Get()
  getHello(): string {
    return 'Hello World!~~';
  }

  @CacheKey('adder')
  @CacheTTL(3)
  @Get('/adder')
  async findAll(@Query('a') a: number, @Query('b') b: number): Promise<number> {
    const sleep = async (ms) => new Promise((res) => setTimeout(res, ms));
    console.log('wait...', a, '+', b);
    await sleep(3000);
    console.log('wait...', a, '+', b);
    return a + b;
  }

  @Get('/adder2')
  async findAll2(
    @Query('a') a: number,
    @Query('b') b: number,
    @Req() request: Request,
  ): Promise<number> {
    console.log('hostname', request.hostname); //localhost
    console.log('path', request.path); // /adder2
    console.log('url', request.url); // /adder2?a=3&b=11
    console.log('originalUrl', request.originalUrl); // /adder2?a=3&b=11
    console.log(
      'fullUrl',
      request.protocol + '://' + request.hostname + request.originalUrl,
    );

    const memo: string | null = await this.cacheManager.get(request.url);
    if (memo) {
      return Number(memo);
    }
    const sleep = async (ms) => new Promise((res) => setTimeout(res, ms));
    console.log('wait...', a, '+', b);
    await sleep(3000);
    console.log('wait...', a, '+', b);
    const res = a + b;
    await this.cacheManager.set(request.url, res);
    return res;
  }

  @Post('/adder3')
  async findAll3(@Body() { a, b }: { a: number; b: number }): Promise<number> {
    const sleep = async (ms) => new Promise((res) => setTimeout(res, ms));
    console.log('wait...', a, '+', b);
    await sleep(3000);
    console.log('wait...', a, '+', b);
    const res = a + b;
    return res;
  }
}
