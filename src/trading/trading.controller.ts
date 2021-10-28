import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Version,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { AuthUser, Roles } from 'src/auth/auth.decorator';
import { MemberInfo } from 'src/member/entities';
import { StrategyName } from './constant/strategy-setting';
import { AddUniversalInput } from './dto/mutation.dtos';
import { TradingService } from './trading.service';

@Controller('/api/trading/')
export class TradingQueryController {
  constructor(private readonly tradingService: TradingService) {}

  //(2) 기본 매매전략리스트
  @Version('1')
  @Get('technicals')
  async getBaseTechnicalStrategyList() {
    return this.tradingService.getBaseTradingStrategyList({});
  }

  //(1) 기본 매매전략
  @Version('1')
  @Get('technicals/:name')
  async getBaseTechnicalStrategy(@Param('name') trading_strategy_name: string) {
    if ((<any>Object).values(StrategyName).includes(trading_strategy_name)) {
      return this.tradingService.getBaseTradingStrategy({
        trading_strategy_name: trading_strategy_name as StrategyName,
      });
    } else {
      throw new NotFoundException('trading_strategy_name is not found');
    }
  }
}

@Controller('/api/trading/')
export class TradingMutationController {
  constructor(private readonly tradingService: TradingService) {}
  // //(4)  전략에 티커 추가하기
  // @Roles(['Any'])
  // @Post('addUniversal')
  // async addUniversal(
  //   @AuthUser() m: MemberInfo,
  //   @Body() addUniversal: AddUniversalInput,
  // ) {
  //   return this.tradingService.addUniversal(m.email_id, {
  //     ...addUniversal,
  //   });
  // }
  //(5) 전략에 매매전략 추가하기
  // @Roles(['Any'])
  // @Post('upsertTradingStrategy')
  // async upsertTradingStrategy(
  //   @AuthUser() m: MemberInfo,
  //   @Body() body: UpsertTradingStrategyInput,
  // ) {
  //   return this.tradingService.upsertTradingStrategy(m.email_id, body);
  // }
  //(6) 전략에 티커 + 매매전략 추가하기
  // @Roles(['Any'])
  // @Post('upsertTickerWithTradingStrategy')
  // async upsertTickerWithTradingStrategy(
  //   @AuthUser() m: MemberInfo,
  //   @Body() body: AddUniversalInput,
  // ) {
  //   return this.tradingService.addUniversal(m.email_id, body);
  // }
}
