import {
  CacheModule,
  CacheStoreFactory,
  forwardRef,
  Module,
} from '@nestjs/common';
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
import { FinancialStatement } from './entities/financial-statement.entity';
import { BacktestModule } from 'src/backtest/backtest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    CacheModule.register({
      store: redisStore as CacheStoreFactory,
      url: process.env.REDIS_API_CACHE_URL,
      ttl: +process.env.REDIS_API_CACHE_TTL_FINANCIAL || 86400, // 10초 캐슁
      // max: 3, // 3개의 key값 유지
    }),
    TypeOrmModule.forFeature([
      Category,
      CategoryList,
      Corporation,
      DailyStock,
      FinancialStatement,
    ]),
    forwardRef(() => BacktestModule),
  ],
  controllers: [FinanceController],
  providers: [FinanceService],
  exports: [FinanceService],
})
export class FinanceModule {}
