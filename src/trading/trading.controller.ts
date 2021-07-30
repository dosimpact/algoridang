import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TradingService } from './trading.service';

@Controller('trading')
export class TradingQueryController {
  constructor(private readonly tradingService: TradingService) {}
  //(1) 기본 매매전략
  async getBaseTradingStrategy() {}
  //(2) 기본 매매전략리스트
  async getBaseTradingStrategyList() {}
  //(3) 기본 매매전략 카피
  async copyBaseTradingStrategy() {}
  //(4)  전략에 티커 추가하기
  async addTicker() {}
  //(5) 전략에 매매전략 추가하기
  async addTradingStrategy() {}
  //(6) 전략에 티커 + 매매전략 추가하기
  async upsertTickerWithTradingStrategy() {}
}

@Controller('trading')
export class TradingMutationController {
  constructor(private readonly tradingService: TradingService) {}
}
