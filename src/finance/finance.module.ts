import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import {
  Category,
  CategoryList,
  Corporation,
  DailyStock,
} from './entities/index';

import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_API_CACHE_HOST, // '127.0.0.1',
      port: +process.env.REDIS_API_CACHE_PORT, //6379,
      password: process.env.REDIS_API_CACHE_PASSWORD, //
      ttl: +process.env.REDIS_API_CACHE_TTL, // 10초 캐슁
      // max: 3, // 3개의 key값 유지
    }),
    TypeOrmModule.forFeature([Category, CategoryList, Corporation, DailyStock]),
  ],
  controllers: [FinanceController],
  providers: [FinanceService],
  exports: [],
})
export class FinanceModule {}
