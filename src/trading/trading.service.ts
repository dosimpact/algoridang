import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinanceService } from 'src/finance/finance.service';
import { StrategyService } from 'src/strategy/strategy.service';
import { Repository } from 'typeorm';
import {
  AddUniversalInput,
  AddUniversalOutput,
  UpsertTradingStrategyInput,
  UpsertTradingStrategyOutput,
  CopyBaseTradingStrategyInput,
  CopyBaseTradingStrategyOutput,
  UpsertTickerWithTradingStrategyInput,
  UpsertTickerWithTradingStrategyOutput,
} from './dto/mutation.dtos';

import {
  getBaseTradingStrategyInput,
  getBaseTradingStrategyListInput,
  getBaseTradingStrategyListOutput,
  getBaseTradingStrategyOutput,
} from './dto/query.dtos';
import {
  BaseTradingStrategy,
  // CustomTradingStrategy,
  SimpleBacktest,
  Universal,
} from './entities';
// import { StockList } from './entities/stock-list.entity';

@Injectable()
export class TradingService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(BaseTradingStrategy)
    private readonly baseTradingStRepo: Repository<BaseTradingStrategy>,
    // @InjectRepository(CustomTradingStrategy)
    // private readonly customTradingStRepo: Repository<CustomTradingStrategy>,
    @InjectRepository(SimpleBacktest)
    private readonly simpleBacktestRepo: Repository<SimpleBacktest>,
    @InjectRepository(Universal)
    private readonly universalRepo: Repository<Universal>,
    private readonly financeService: FinanceService,
    private readonly strategyService: StrategyService,
  ) {}
  //(1) 기본 매매전략
  async getBaseTradingStrategy({
    trading_strategy_code,
  }: getBaseTradingStrategyInput): Promise<getBaseTradingStrategyOutput> {
    try {
      const baseTradingStrategy = await this.baseTradingStRepo.findOne({
        where: { trading_strategy_code },
      });
      if (!baseTradingStrategy)
        return { ok: false, error: 'cannot find preset st. by Id ' };
      return { ok: true, baseTradingStrategy };
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
  }
  //(2) 기본 매매전략리스트
  async getBaseTradingStrategyList(
    getBaseTradingStrategyList: getBaseTradingStrategyListInput,
  ): Promise<getBaseTradingStrategyListOutput> {
    try {
      const baseTradingStrategyList = await this.baseTradingStRepo.find({});
      return { ok: true, baseTradingStrategyList };
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
  }
  //(3) 기본 매매전략 카피 (deprecated)
  // - 유니버셜에 바로 추가
  //🚀todo refactor
  // async __copyBaseTradingStrategy({
  //   setting_json,
  //   trading_strategy_code,
  // }: CopyBaseTradingStrategyInput): Promise<CopyBaseTradingStrategyOutput> {
  //   try {
  //     const tradingStrategy = await this.baseTradingStRepo.findOne({
  //       where: { trading_strategy_code },
  //     });
  //     if (!tradingStrategy) return { ok: false };
  //     const customTradingStrategy = await this.customTradingStRepo.save(
  //       this.customTradingStRepo.create({
  //         ...tradingStrategy,
  //         setting_json,
  //       }),
  //     );
  //     return { ok: true, customTradingStrategy };
  //   } catch (error) {
  //     this.logger.error(error);
  //     return { ok: false };
  //   }
  // }

  //(4)  전략에 티커 추가하기
  async addUniversal(
    email_id: string,
    {
      strategy_code,
      ticker,
      end_date,
      start_date,
      select_yes_no,
    }: AddUniversalInput,
  ): Promise<AddUniversalOutput> {
    try {
      // 티커 및 전략 존재성
      const existTicker = await this.financeService.getCorporation({
        term: ticker,
      });
      if (!existTicker.ok || existTicker.corporation.ticker !== ticker)
        return { ok: false, error: 'cannot find corp given ticker' };

      const existStrategy = await this.strategyService.__checkMyStrategy({
        strategy_code,
        email_id,
      });
      if (!existStrategy.ok)
        return {
          ok: false,
          error: 'cannot find strategy_code given strategy_code',
        };
      // universal 매핑 테이블 생성
      const universal = await this.universalRepo.save(
        this.universalRepo.create({
          ticker,
          strategy_code,
          end_date,
          start_date,
          select_yes_no,
        }),
      );
      return { ok: true, universal };
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
  }
  // (5) 전략에 매매전략 추가하기
  async upsertTradingStrategy(
    email_id: string,
    {
      strategy_code,
      universal_code,
      trading_strategy_name,
      setting_json,
    }: UpsertTradingStrategyInput,
  ): Promise<UpsertTradingStrategyOutput> {
    try {
      // 전략 및 유니버셜 존재성 확인
      const existStrategy = await this.strategyService.__checkMyStrategy({
        strategy_code,
        email_id,
      });
      if (!existStrategy.ok)
        return {
          ok: false,
          error: 'cannot find strategy_code given strategy_code',
        };
      // unversial을 찾아 전략 추가
      const universal = await this.universalRepo.findOne({
        where: {
          universal_code,
        },
      });
      if (!universal)
        return {
          ok: false,
          error: 'cannot find universal given universal_code',
        };
      if (setting_json) universal.setting_json = setting_json;
      if (trading_strategy_name)
        universal.trading_strategy_name = trading_strategy_name;
      await this.universalRepo.save(universal);
      return { ok: true, universal };
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
  }
  // todo refactor
  //(6) 전략에 티커 + 매매전략 추가하기
  async upsertTickerWithTradingStrategy(
    email_id,
    {
      setting_json,
      start_date,
      strategy_code,
      ticker,
      trading_strategy_name,
      end_date,
      select_yes_no,
    }: UpsertTickerWithTradingStrategyInput,
  ): Promise<UpsertTickerWithTradingStrategyOutput> {
    try {
      const res = await this.addUniversal(email_id, {
        strategy_code,
        ticker,
        end_date,
        start_date,
        select_yes_no,
      });
      if (!res.ok) return res;
      const { universal } = await this.upsertTradingStrategy(email_id, {
        setting_json,
        strategy_code,
        trading_strategy_name,
        universal_code: res.universal.universal_code,
      });
      return { ok: true, universal };
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
  }

  //   (GET)tradingStrategyList		매매전략리스트 { 기본 셋팅 }	(1) 매매전략 리스트 요청
  // (POST)createTradingStrategy	tradingStragetyCode
  // settingJson		(2) (관리자) 메매전략 생성 요청
}
