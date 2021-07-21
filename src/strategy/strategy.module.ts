import { Module } from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { StrategyController } from './strategy.controller';
import { StrategyResolver } from './strategy.resolver';

@Module({
  controllers: [StrategyController],
  providers: [StrategyService, StrategyResolver]
})
export class StrategyModule {}
