import { Module } from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { StrategyController } from './strategy.controller';
import { StrategyResolver } from './strategy.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hash, HashList, MemberStrategy, StockList } from './entities';
import { InvestProfitInfo } from 'src/backtest/entities';
import { MemberModule } from 'src/member/member.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hash,
      HashList,
      MemberStrategy,
      StockList,
      InvestProfitInfo,
    ]),
  ],
  controllers: [StrategyController],
  providers: [StrategyService, StrategyResolver],
  exports: [StrategyService],
})
export class StrategyModule {}
