import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthUser, Roles } from 'src/auth/auth.decorator';
import { MemberInfo } from 'src/member/entities';
import { AddUniversalInput } from './dto/mutation.dtos';
import {
  UpsertTradingStrategyInput,
  UpsertTickerWithTradingStrategyInput,
} from './dto/mutation.dtos';
import { TradingService } from './trading.service';

@Controller('/api/trading/')
export class TradingQueryController {
  constructor(private readonly tradingService: TradingService) {}
  //(1) 기본 매매전략
  @Get('getBaseTradingStrategy/:code')
  async getBaseTradingStrategy(@Param('code') code) {
    return this.tradingService.getBaseTradingStrategy({
      trading_strategy_code: code,
    });
  }
  //(2) 기본 매매전략리스트
  @Get('getBaseTradingStrategyList')
  async getBaseTradingStrategyList() {
    return this.tradingService.getBaseTradingStrategyList({});
  }
}

@Controller('/api/trading/')
export class TradingMutationController {
  constructor(private readonly tradingService: TradingService) {}
  //(4)  전략에 티커 추가하기
  @Roles(['Any'])
  @Post('addTicker')
  async addTicker(
    @AuthUser() m: MemberInfo,
    @Body() addTicker: AddUniversalInput,
  ) {
    return this.tradingService.addUniversal(m.email_id, {
      ...addTicker,
    });
  }
  //(5) 전략에 매매전략 추가하기
  @Post('upsertTradingStrategy')
  async upsertTradingStrategy(
    @AuthUser() m: MemberInfo,
    @Body() body: UpsertTradingStrategyInput,
  ) {
    return this.tradingService.upsertTradingStrategy(m.email_id, body);
  }
  //(6) 전략에 티커 + 매매전략 추가하기
  @Roles(['Any'])
  @Post('upsertTickerWithTradingStrategy')
  async upsertTickerWithTradingStrategy(
    @AuthUser() m: MemberInfo,
    @Body() body: UpsertTickerWithTradingStrategyInput,
  ) {
    return this.tradingService.upsertTickerWithTradingStrategy(
      m.email_id,
      body,
    );
  }
}
