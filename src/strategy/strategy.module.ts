import { Module } from '@nestjs/common';
import { StrategyReadService, StrategyWriteService } from './strategy.service';
import { StrategyController } from './strategy.controller';
import { StrategyResolver } from './strategy.resolver';

@Module({
  controllers: [StrategyController],
  providers: [StrategyReadService, StrategyWriteService, StrategyResolver],
})
export class StrategyModule {}
