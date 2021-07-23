import { Module } from '@nestjs/common';
import { BacktestService } from './backtest.service';
import { BacktestController } from './backtest.controller';
import { BacktestResolver } from './backtest.resolver';

@Module({
  controllers: [BacktestController],
  providers: [BacktestService, BacktestResolver]
})
export class BacktestModule {}
