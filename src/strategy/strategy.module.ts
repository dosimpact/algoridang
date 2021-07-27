import { Module } from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { StrategyController } from './strategy.controller';
import { StrategyResolver } from './strategy.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hash, HashList, MemberStrategy, StockList } from './entities';
@Module({
  imports: [
    TypeOrmModule.forFeature([Hash, HashList, MemberStrategy, StockList]),
  ],
  controllers: [StrategyController],
  providers: [StrategyService, StrategyResolver],
})
export class StrategyModule {}
