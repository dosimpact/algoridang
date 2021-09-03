import { forwardRef, Global, Module } from '@nestjs/common';
import { TradingService } from './trading.service';
import { TradingResolver } from './trading.resolver';
import {
  TradingMutationController,
  TradingQueryController,
} from './trading.controller';
import {
  BaseTradingStrategy,
  // CustomTradingStrategy,
  SimpleBacktest,
  Universal,
} from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceModule } from 'src/finance/finance.module';
import { StrategyModule } from 'src/strategy/strategy.module';
// import { StockList } from './entities/stock-list.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      BaseTradingStrategy,
      // CustomTradingStrategy,
      // StockList,
      SimpleBacktest,
      Universal,
    ]),
    forwardRef(() => StrategyModule),
    forwardRef(() => FinanceModule),
  ],
  controllers: [TradingQueryController, TradingMutationController],
  providers: [TradingService, TradingResolver],
  exports: [TradingService],
})
export class TradingModule {}
