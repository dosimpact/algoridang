import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Version,
  Query,
} from '@nestjs/common';
import { AuthUser, Roles } from 'src/auth/auth.decorator';
import { MemberInfo } from 'src/member/entities';
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
  @Get('technicals/:code')
  async getBaseTechnicalStrategy(@Param('code') code) {
    return this.tradingService.getBaseTradingStrategy({
      trading_strategy_code: code,
    });
  }

  // TODO 목업 API를 마킹한 곳
  // -----------------------

  // 퀀트 필터 리스트를 주는 API
  @Version('1')
  @Get('filters')
  async getFilterFactorList() {
    return {
      ok: true,
      filters: {
        sector: [
          { name: '코스피', type: 'boolean' },
          { name: '코스닥', type: 'boolean' },
        ],
        fundamental: [
          { name: '시가총액', type: 'range' },
          { name: '주가', type: 'range' },
          { name: 'PER', type: 'range' },
          { name: 'PCR', type: 'range' },
          { name: 'PSR', type: 'range' },
        ],
      },
    };
  }
  // 퀀트 필터를 통해 걸러진 종목을 주는 API
  @Version('1')
  @Post('filters')
  async getFilterResultList(@Body() body) {
    console.log('recived body', body);
    return {
      ok: true,
      corporations: [
        {
          ticker: '035720',
          corp_name: '카카오',
        },
        {
          ticker: '006400',
          corp_name: '삼성SDI',
        },
        {
          ticker: '003550',
          corp_name: 'LG',
        },
        {
          ticker: '005930',
          corp_name: '삼성전자',
        },
      ],
    };
  }

  // 미니 백테스팅 요청 API (목업API제거시 > backtest )
  @Version('1')
  @Post('mini-backtests/:ticker')
  async requestMiniBacktesting(@Body() body, @Query('ticker') ticker) {
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
    await sleep(700);
    if (body['trading_strategy_name']) {
      return {
        ok: true,
        result: [
          {
            baseTradingStrategy: {
              trading_strategy_code: 1,
              trading_strategy_name: body['trading_strategy_name'],
              setting_json: {
                GoldenCross: {
                  pfast: 5,
                  pslow: 20,
                },
              },
            },
            CAGR: Number(Math.random()).toFixed(3),
            MDD: Number(Math.random()).toFixed(3),
            ticker,
          },
        ],
      };
    } else {
      return {
        ok: true,
        result: [
          {
            baseTradingStrategy: {
              trading_strategy_code: 1,
              trading_strategy_name: 'GoldenCross',
              setting_json: {
                GoldenCross: {
                  pfast: 5,
                  pslow: 20,
                },
              },
            },
            CAGR: Number(Math.random()).toFixed(3),
            MDD: Number(Math.random()).toFixed(3),
          },
          {
            baseTradingStrategy: {
              trading_strategy_code: 2,
              trading_strategy_name: 'SMA',
              setting_json: {
                SMA: {
                  SMA_A: 5,
                },
              },
            },
            CAGR: Number(Math.random()).toFixed(3),
            MDD: Number(Math.random()).toFixed(3),
          },
        ],
      };
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
