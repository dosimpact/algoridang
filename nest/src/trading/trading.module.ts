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

/**
 * 사용자 투자 전략에 필요한 매매 기법들을 담은 모듈 입니다.
 * - Universal : 투자전략에 사용하는 종목들 , N개의 종목은 포트가 된다.
 * - SimpleBacktest : 투자 전략 -- 매매 전략 매칭을 위해 , 간단하게 백테스틑 하는 용도 .
 *    N개의 종목과전략이 포트가 된다.
 * - BaseTradingStrategy : 매매전략을 담은 엔터티
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([BaseTradingStrategy, SimpleBacktest, Universal]),
    forwardRef(() => StrategyModule),
    forwardRef(() => FinanceModule),
  ],
  controllers: [TradingQueryController, TradingMutationController],
  providers: [TradingService, TradingResolver],
  exports: [TradingService],
})
export class TradingModule {}
