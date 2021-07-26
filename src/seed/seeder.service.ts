import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as Chance from 'chance';
import { Logger } from '@nestjs/common';
import {
  AccumulateProfitRateChart,
  BacktestDetailInfo,
  BacktestMontlyProfitRateChart,
  BacktestQueue,
  BacktestWinRatio,
  History,
  InvestProfitInfo,
} from 'src/backtest/entities';
import {
  Category,
  CategoryList,
  Corporation,
  DailyStock,
} from 'src/finance/entities';
import {
  LookupMemberList,
  MemberInfo,
  OperationMemberList,
} from 'src/member/entities';
import {
  Hash,
  HashList,
  MemberStrategy,
  StockList,
} from 'src/strategy/entities';
import {
  BaseTradingStrategy,
  CustomTradingStrategy,
} from 'src/trading/entities';
import { UploadedObject } from 'src/upload/entities/uploaded-object.entity';
import { UserRole } from 'src/member/entities/member-info.entity';
import { InvestType } from 'src/strategy/entities/member-strategy.entity';
import { preSet__BaseTradingStrategy_List } from './pre-settings/data';
/*
CategoryList
Category
Corporation
DailyStock
CustomTradingStrategy
BaseTradingStrategy
Hash
HashList
MemberStrategy
StockList
AccumulateProfitRateChart
BacktestDetailInfo
BacktestMontlyProfitRateChart
BacktestQueue
BacktestWinRatio
History
InvestProfitInfo
LookupMemberList
MemberInfo
OperationMemberList
UploadedObject
*/
@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);
  constructor(
    @InjectRepository(CategoryList)
    private readonly CategoryList: Repository<CategoryList>,
    @InjectRepository(Category)
    private readonly Category: Repository<Category>,
    @InjectRepository(Corporation)
    private readonly Corporation: Repository<Corporation>,
    @InjectRepository(DailyStock)
    private readonly DailyStock: Repository<DailyStock>,
    @InjectRepository(CustomTradingStrategy)
    private readonly CustomTradingStrategy: Repository<CustomTradingStrategy>,
    @InjectRepository(BaseTradingStrategy)
    private readonly BaseTradingStrategy: Repository<BaseTradingStrategy>,
    @InjectRepository(Hash)
    private readonly Hash: Repository<Hash>,
    @InjectRepository(HashList)
    private readonly HashList: Repository<HashList>,
    @InjectRepository(MemberStrategy)
    private readonly MemberStrategy: Repository<MemberStrategy>,
    @InjectRepository(StockList)
    private readonly StockList: Repository<StockList>,
    @InjectRepository(AccumulateProfitRateChart)
    private readonly AccumulateProfitRateChart: Repository<AccumulateProfitRateChart>,
    @InjectRepository(BacktestDetailInfo)
    private readonly BacktestDetailInfo: Repository<BacktestDetailInfo>,
    @InjectRepository(BacktestMontlyProfitRateChart)
    private readonly BacktestMontlyProfitRateChart: Repository<BacktestMontlyProfitRateChart>,
    @InjectRepository(BacktestQueue)
    private readonly BacktestQueue: Repository<BacktestQueue>,
    @InjectRepository(BacktestWinRatio)
    private readonly BacktestWinRatio: Repository<BacktestWinRatio>,
    @InjectRepository(History)
    private readonly History: Repository<History>,
    @InjectRepository(InvestProfitInfo)
    private readonly InvestProfitInfo: Repository<InvestProfitInfo>,
    @InjectRepository(LookupMemberList)
    private readonly LookupMemberList: Repository<LookupMemberList>,
    @InjectRepository(MemberInfo)
    private readonly MemberInfo: Repository<MemberInfo>,
    @InjectRepository(OperationMemberList)
    private readonly OperationMemberList: Repository<OperationMemberList>,
    @InjectRepository(UploadedObject)
    private readonly UploadedObject: Repository<UploadedObject>,
  ) {}

  // seed - entity
  // (1) 사용자 n명을 추가하는 시더
  async seedMemberInfo(n: number) {
    try {
      await Promise.all(
        new Array(n).fill(0).map(async () => {
          return this.MemberInfo.save(this.__createMemberInfo());
        }),
      );
      this.logger.log(`✔ seedMemberInfo ${n} done`);
      return true;
    } catch (error) {
      this.logger.error(`❌ seedMemberInfo fails`);
      return false;
    }
  }
  // (2) 기본 매매전략을 resetting
  async seedBaseTradingStrategy() {
    try {
      const targets = await this.BaseTradingStrategy.find();
      await Promise.all(
        targets.map(async (t) =>
          this.BaseTradingStrategy.delete(t.trading_strategy_code),
        ),
      );
      await Promise.all(
        preSet__BaseTradingStrategy_List.map(async (t) =>
          this.BaseTradingStrategy.save(this.BaseTradingStrategy.create(t)),
        ),
      );
      this.logger.verbose('✔ seedBaseTradingStrategy');
    } catch (error) {
      this.logger.error('❌ seedBaseTradingStrategy', error);
    }
  }

  // seed - relation mapping
  // (1) 시나리오
  async seedScenario01() {
    // 사용자 1,2 를 만든다.
    // const user1 = await this.MemberInfo.save(
    //   this.MemberInfo.create({
    //     email_id: 'blue_rose17@naver.com',
    //     password: '123',
    //     member_name: 'Test_Taker1',
    //   }),
    // );
    // const user2 = await this.MemberInfo.save(
    //   this.MemberInfo.create({
    //     email_id: 'changyu.park1@gmail.com',
    //     password: '123',
    //     member_name: 'Test_Maker1',
    //   }),
    // );
    // 사용자 전략 생성
    // const st1 = await this.MemberStrategy.save(
    //   this.MemberStrategy.create({
    //     strategy_name: '찬규의 테스트 케이스',
    //     invest_type: InvestType.StableIncome,
    //     strategy_explanation: '찬규의 테스트 관련 전략 설명란 입니다.',
    //     operation_yes_no: true,
    //     alarm_setting: false,
    //     investment_game_invest_delete_yes_no: false,
    //     open_yes_no: true,
    //     operator_id: 'blue_rose17@naver.com',
    //     maker_id: 'changyu.park1@gmail.com',
    //     image_url:
    //       'https://algoridang.s3.ap-northeast-2.amazonaws.com/common/1627272438714d_thumb01.jpeg',
    //   }),
    // );
    this.logger.verbose('✔ seedScenario01');
  }

  __createMemberInfo() {
    const email = Chance().email();
    return this.MemberInfo.create({
      email_id: email, //Chance().email(),
      password: email, //Chance().age(),
      member_name: Chance().name(),
    });
  }
}
