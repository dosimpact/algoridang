import { CacheModule, Module } from '@nestjs/common';
import { StrategyService } from './strategy.service';
import {
  StrategyMutationController,
  StrategyQueryController,
} from './strategy.controller';
import { StrategyResolver } from './strategy.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hash, HashList, MemberStrategy, StockList } from './entities';
import { InvestProfitInfo } from 'src/backtest/entities';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

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
    TypeOrmModule.forFeature([
      Hash,
      HashList,
      MemberStrategy,
      StockList,
      InvestProfitInfo,
    ]),
  ],
  controllers: [StrategyMutationController, StrategyQueryController],
  providers: [StrategyService, StrategyResolver],
  exports: [StrategyService],
})
export class StrategyModule {}
