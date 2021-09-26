import {
  CacheModule,
  CacheStoreFactory,
  forwardRef,
  Module,
} from '@nestjs/common';
import { StrategyService } from './strategy.service';
import {
  StrategyMutationController,
  StrategyQueryController,
} from './strategy.controller';
import { StrategyResolver } from './strategy.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hash, HashList, MemberStrategy } from './entities';
import { InvestProfitInfo } from 'src/backtest/entities';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { StrategyHashService } from './strategy-hash.service';
import { TradingModule } from 'src/trading/trading.module';
import { BacktestModule } from 'src/backtest/backtest.module';
import { FinanceModule } from 'src/finance/finance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    CacheModule.register({
      store: redisStore as CacheStoreFactory,
      url: process.env.REDIS_API_CACHE_URL,
      ttl: +process.env.REDIS_API_CACHE_TTL, // 10초 캐슁
      // max: 3, // 3개의 key값 유지
    }),
    TypeOrmModule.forFeature([
      Hash,
      HashList,
      MemberStrategy,
      // StockList,
      InvestProfitInfo,
    ]),
    forwardRef(() => TradingModule),
    forwardRef(() => BacktestModule),
    forwardRef(() => FinanceModule),
  ],
  controllers: [StrategyMutationController, StrategyQueryController],
  providers: [StrategyService, StrategyHashService, StrategyResolver],
  exports: [StrategyService],
})
export class StrategyModule {}
