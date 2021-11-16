import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  AccumulateProfitRateChart,
  BacktestDailyProfitRateChart,
  BacktestDetailInfo,
  BacktestMontlyProfitRateChart,
  BacktestQueue,
  BacktestWinRatio,
  History,
  InvestProfitInfo,
} from 'src/backtest/entities';
import { LookupMemberList, MemberInfo } from 'src/member/entities';
import { OperationMemberList } from 'src/member/entities/operation-member-list.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HashList } from './hash-list.entity';
import { Universal } from 'src/trading/entities/universal';
import { UniversalProducer } from '../json/universal_producer.entity';
import { Type } from 'class-transformer';
import { AccumulateProfitRateChartJSON } from '../constant/JSONS';

export enum InvestType {
  Unclassified = 'Unclassified', // 0 - 미분류
  StableIncome = 'StableIncome', // 1 - 수익 안정형
  Neutral = 'Neutral', // 2 - 중립형
  RiskTaking = 'RiskTaking', // 3 - 위험추구형
}
// Error
export enum BacktestState {
  New = 'New', // 생성
  Ready = 'Ready', // 진입 & 대기중
  Running = 'Running', // 작업중
  Success = 'Success', // 완료
  Error = 'Error', // 애러
}

@Entity({ name: 'member_strategy' })
export class MemberStrategy {
  @IsString()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  strategy_code: string;

  @IsString()
  @Column({ type: 'varchar', length: 30 })
  strategy_name: string;

  @IsEnum(InvestType)
  @Column({ type: 'enum', enum: InvestType, default: InvestType.Unclassified })
  invest_type: InvestType;

  @IsString()
  @Column({ nullable: true })
  strategy_explanation: string;

  @IsBoolean()
  @Column({ default: false })
  operation_yes_no: boolean; // 전략 탐색

  @IsBoolean()
  @Column({ default: false })
  alarm_setting: boolean;

  @IsBoolean()
  @Column({ default: false })
  open_yes_no: boolean;

  @IsString()
  @Column({ type: 'varchar', length: 255, nullable: true })
  image_url: string;

  @IsDateString()
  @CreateDateColumn({ type: 'timestamptz' })
  create_date: Date;

  @IsOptional()
  @IsDateString()
  @DeleteDateColumn({ type: 'timestamptz' })
  deleteAt?: Date;

  @ValidateNested()
  @Type()
  @Column({ type: 'json', nullable: true })
  universal_producer?: UniversalProducer;

  // @IsString()
  // @Column({ type: 'enum', enum: BacktestState, default: BacktestState.New })
  // backtest_status: BacktestState; // 최근 백테스트 상황 ( )

  @IsString()
  @Column({ type: 'varchar', length: 255, nullable: true })
  status_info: string; // 최근 백테스트 결과 - 응답 메시지

  @IsString()
  @Column({ type: 'varchar', length: 15, nullable: true })
  status_code: string; // 최근 백테스트 결과 - 응답 메시지

  @IsString()
  @Column({ type: 'json', nullable: true })
  accumulateProfitRateChartJSON?: AccumulateProfitRateChartJSON[];

  // TOOD : 상태 정의 문서
  // - null , Running, Error, Success

  // 1:1 관계

  // (2) 투자 수익 정보
  @OneToOne(() => InvestProfitInfo, (profitInfo) => profitInfo.strategy)
  investProfitInfo: InvestProfitInfo;

  // (3) 백테스트 상세 정보
  @OneToOne(() => BacktestDetailInfo, (backTDetail) => backTDetail.strategy)
  backtestDetailInfo: BacktestDetailInfo;

  // (4) 백테스트 승률 정보
  @OneToOne(() => BacktestWinRatio, (WinRatio) => WinRatio.strategy)
  backtestWinRatio: BacktestWinRatio;

  // ------------------------------------------------------------
  // n:1 관계

  // (1) N개의 백테스트 큐를 가진다.
  @OneToMany(() => BacktestQueue, (backtestQueue) => backtestQueue.strategy)
  queueList: BacktestQueue[];

  // (1) 제작자 연결 (전략 author)
  @Column({ type: 'varchar', length: 255 })
  maker_id: string;

  @ManyToOne(() => MemberInfo, (mi) => mi.stragetyOperatedList)
  @JoinColumn({ name: 'maker_id' })
  maker: MemberInfo;

  // (2) 운용자 연결(전략 소유자)
  @Column({ type: 'varchar', length: 255 })
  operator_id: string;

  @ManyToOne(() => MemberInfo, (mi) => mi.stragetyMadeList)
  @JoinColumn({ name: 'operator_id' })
  operator: MemberInfo;

  // (3) 누적수익률 차트 데이터
  @OneToMany(() => AccumulateProfitRateChart, (chart) => chart.strategy)
  accumulateProfitRateChart?: AccumulateProfitRateChart[];

  // (4) 월간수익률 차트 데이터
  @OneToMany(() => BacktestMontlyProfitRateChart, (chart) => chart.strategy)
  backtestMontlyProfitRateChart?: BacktestMontlyProfitRateChart[];

  // (4) 일간 수익률 차트 데이터
  @OneToMany(() => BacktestDailyProfitRateChart, (chart) => chart.strategy)
  backtestDailyProfitRateChart?: BacktestDailyProfitRateChart[];

  // (5) (deprecated) 전략에 셋팅된 매매전략(셋팅포함)
  // @OneToMany(() => CustomTradingStrategy, (cts) => cts.stragety)
  // customTradingStrategy: CustomTradingStrategy[];

  // (6) 전략은 유니버셜을 같는다. 1:N 튜플 매칭
  @OneToMany(() => Universal, (univ) => univ.memberStrategy)
  universal: Universal[];

  // ------------------------------------------------------------
  // n:m 관계
  // (1) 전략 운용중인 사용자 리스트
  @OneToMany(() => OperationMemberList, (om) => om.strategy)
  operationMemberList: OperationMemberList[];

  // (2) 전략을 조회한 사용자 리스트
  @OneToMany(() => LookupMemberList, (lm) => lm.strategy)
  lookupMemberList: LookupMemberList[];

  // (3) 전략의 태그 리스트
  @OneToMany(() => HashList, (hashList) => hashList.strategy)
  hashList: HashList[];

  // (4) 전략의 히스토리
  @OneToMany(() => History, (history) => history.strategy)
  histories: History[];

  // (5) 전략의 유니버셜 매핑
  // @OneToMany(() => StockList, (sl) => sl.strategy)
  // stockList: StockList[];

  // ----------------------- 유틸리티 객체

  // async clone(
  //   sourceStrategy: MemberStrategy,
  //   patchProps: {
  //     email_id: string;
  //     strategy_name?: string;
  //   },
  // ) {
  //   const { email_id, strategy_name } = patchProps;
  //   // 1 전략 만들기
  //   const templateStrategy = this.MemberStrategyRepo.create({});

  //   // 1.1 전략 디폴트 데이터
  //   templateStrategy.strategy_name = sourceStrategy.strategy_name;
  //   templateStrategy.create_date = sourceStrategy.create_date;
  //   templateStrategy.invest_type = sourceStrategy.invest_type;
  //   templateStrategy.strategy_explanation = sourceStrategy.strategy_explanation;
  //   templateStrategy.operation_yes_no = sourceStrategy.operation_yes_no;
  //   templateStrategy.alarm_setting = sourceStrategy.alarm_setting;
  //   // templateStrategy.deleteAt = sourceStrategy.deleteAt;
  //   templateStrategy.open_yes_no = sourceStrategy.open_yes_no;
  //   // templateStrategy.operator_id = sourceStrategy.operator_id;
  //   templateStrategy.maker_id = sourceStrategy.maker_id;
  //   templateStrategy.image_url = sourceStrategy.image_url;
  //   templateStrategy.universal_producer = sourceStrategy.universal_producer;

  //   // 1.2 전략 forked 데이터
  //   if (strategy_name) templateStrategy.strategy_name = strategy_name;
  //   templateStrategy.operator_id = email_id;
  //   templateStrategy.open_yes_no = false;
  //   templateStrategy.operation_yes_no = true;
  //   delete templateStrategy.create_date; // ORM 처리

  //   const newStrategy = await this.MemberStrategyRepo.save(templateStrategy);
  //   return newStrategy;
  // }
}
