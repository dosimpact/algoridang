import { Module } from '@nestjs/common';
import { BacktestModule } from 'src/backtest/backtest.module';
import { StrategyModule } from 'src/strategy/strategy.module';
import { CronService } from './service/cron.service';

@Module({
  imports: [BacktestModule, StrategyModule],
  providers: [CronService],
})
export class CronModule {}
