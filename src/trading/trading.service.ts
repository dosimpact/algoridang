import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinanceService } from 'src/finance/finance.service';
import { StrategyService } from 'src/strategy/strategy.service';
import { Repository } from 'typeorm';
import {
  AddUniversalInput,
  AddUniversalOutput,
  UpsertTradingStrategyInput,
  UpsertTradingStrategyOutput,
  AddUniversalOnlyInput,
  AddUniversalOnlyOutput,
} from './dto/mutation.dtos';

import {
  GetBaseTradingStrategyInput,
  GetBaseTradingStrategyListInput,
  GetBaseTradingStrategyListOutput,
  GetBaseTradingStrategyOutput,
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

    @Inject(forwardRef(() => StrategyService))
    private readonly strategyService: StrategyService,
  ) {}
  //(1) 기본 매매전략
  async getBaseTradingStrategy({
    trading_strategy_code,
  }: GetBaseTradingStrategyInput): Promise<GetBaseTradingStrategyOutput> {
    const baseTradingStrategy = await this.baseTradingStRepo.findOneOrFail({
      where: { trading_strategy_code },
    });
    return { ok: true, baseTradingStrategy };
  }
  //(2) 기본 매매전략리스트
  async getBaseTradingStrategyList(
    GetBaseTradingStrategyList: GetBaseTradingStrategyListInput,
  ): Promise<GetBaseTradingStrategyListOutput> {
    const baseTradingStrategyList = await this.baseTradingStRepo.find({});
    return { ok: true, baseTradingStrategyList };
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

  //(4) 전략에 티커 추가하기
  async addUniversalOnly(
    email_id: string,
    { strategy_code, ticker }: AddUniversalOnlyInput,
  ): Promise<AddUniversalOnlyOutput> {
    // 티커 및 전략 존재성
    await this.financeService.getCorporation({
      term: ticker,
    });

    await this.strategyService.__checkMyStrategy(email_id, {
      strategy_code,
    });

    // universal 매핑 테이블 생성
    const universal = await this.universalRepo.save(
      this.universalRepo.create({
        ticker,
        strategy_code,
      }),
    );
    return { ok: true, universal };
  }
  // (5) 전략에 매매전략 추가하기
  async __upsertTradingStrategy(
    email_id: string,
    {
      strategy_code,
      universal_code,
      trading_strategy_name,
      setting_json,
    }: UpsertTradingStrategyInput,
  ): Promise<UpsertTradingStrategyOutput> {
    // 전략 및 유니버셜 존재성 확인
    const existStrategy = await this.strategyService.__checkMyStrategy(
      email_id,
      {
        strategy_code,
      },
    );
    // unversial을 찾아 전략 추가
    const universal = await this.universalRepo.findOneOrFail({
      where: {
        universal_code,
      },
    });
    if (setting_json) universal.setting_json = setting_json;
    if (trading_strategy_name)
      universal.trading_strategy_name = trading_strategy_name;
    await this.universalRepo.save(universal);
    return { ok: true, universal };
  }
  //(6) 전략에 티커 + 매매전략 추가하기
  async addUniversal(
    email_id,
    {
      setting_json,
      strategy_code,
      ticker,
      trading_strategy_name,
    }: AddUniversalInput,
  ): Promise<AddUniversalOutput> {
    const res = await this.addUniversalOnly(email_id, {
      strategy_code,
      ticker,
    });
    if (!res.ok) return res;
    const { universal } = await this.__upsertTradingStrategy(email_id, {
      setting_json,
      strategy_code,
      trading_strategy_name,
      universal_code: res.universal.universal_code,
    });
    return { ok: true, universal };
  }
}
