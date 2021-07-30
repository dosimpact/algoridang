import { Module } from '@nestjs/common';
import { BacktestService } from './backtest.service';
import { BacktestController } from './backtest.controller';
import { BacktestResolver } from './backtest.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AccumulateProfitRateChart,
  BacktestDetailInfo,
  BacktestMontlyProfitRateChart,
  BacktestQueue,
  BacktestWinRatio,
  InvestProfitInfo,
  History,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccumulateProfitRateChart,
      BacktestDetailInfo,
      BacktestMontlyProfitRateChart,
      BacktestQueue,
      BacktestWinRatio,
      History,
      InvestProfitInfo,
    ]),
  ],
  controllers: [BacktestController],
  providers: [BacktestService, BacktestResolver],
})
export class BacktestModule {}
