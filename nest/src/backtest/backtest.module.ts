import {
  CacheModule,
  CacheStoreFactory,
  forwardRef,
  Module,
} from '@nestjs/common';
import { BacktestService } from './backtest.service';
import { BacktestResolver } from './backtest.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AccumulateProfitRateChart,
  BacktestDetailInfo,
  BacktestMontlyProfitRateChart,
  BacktestDailyProfitRateChart,
  BacktestQueue,
  BacktestWinRatio,
  InvestProfitInfo,
  History,
} from './entities';
import {
  BacktestMutationController,
  BacktestQueryController,
} from './backtest.controller';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { FlaskService } from './flask.service';
import { StrategyModule } from 'src/strategy/strategy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    TypeOrmModule.forFeature([
      AccumulateProfitRateChart,
      BacktestDetailInfo,
      BacktestMontlyProfitRateChart,
      BacktestDailyProfitRateChart,
      BacktestQueue,
      BacktestWinRatio,
      History,
      InvestProfitInfo,
    ]),
    CacheModule.register({
      store: redisStore as CacheStoreFactory,
      url: process.env.REDIS_API_CACHE_URL,
      ttl: +process.env.REDIS_API_CACHE_TTL, // 10초 캐슁
      // max: 3, // 3개의 key값 유지
    }),
    forwardRef(() => StrategyModule),
  ],
  controllers: [BacktestQueryController, BacktestMutationController],
  providers: [BacktestService, BacktestResolver, FlaskService],
  exports: [BacktestService, FlaskService],
})
export class BacktestModule {}
