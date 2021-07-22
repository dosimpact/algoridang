import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import {
  AccumulateProfitRateChart,
  BacktestDetailInfo,
  BacktestQueue,
  BacktestWinRatio,
  InvestProfitInfo,
} from 'src/backtest/entities';
import { LookupMemberList, MemberInfo } from 'src/member/entities';
import { OperationMemberList } from 'src/member/entities/operation-member-list.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HashList } from './hash-list.entity';

export enum InvestType {
  Unclassified = 'Unclassified', // 0 - 미분류
  StableIncome = 'StableIncome', // 1 - 수익 안정형
  Neutral = 'Neutral', // 2 - 중립형
  RiskTaking = 'RiskTaking', // 3 - 위험추구형
}

@Entity({ name: 'member-strategy' })
export class MemberStrategy {
  @IsNumber()
  @PrimaryGeneratedColumn()
  strategy_code: number;

  @IsString()
  @Column({ type: 'varchar', length: 30 })
  strategy_name: string;

  @IsDate()
  @CreateDateColumn({ type: 'timestamptz' })
  create_date: Date;

  @IsEnum(InvestType)
  @Column({ type: 'enum', enum: InvestType, default: InvestType.Neutral })
  invest_type: InvestType;

  @IsBoolean()
  @Column()
  strategy_explanation: boolean;

  @IsBoolean()
  @Column()
  alarm_setting: boolean;

  @IsBoolean()
  @Column()
  investment_game_invest_delete_yes_no: boolean;

  @IsBoolean()
  @Column()
  open_yes_no: boolean;

  // 1:1 관계
  // (1) 1개의 백테스트 큐를 가진다.
  @Column()
  queue_code: string;

  @OneToOne(() => BacktestQueue, (backtestQueue) => backtestQueue.strategy)
  @JoinColumn({ name: 'queue_code' })
  queue: BacktestQueue;

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
  // (1) 제작자 연결 (전략 author)
  @Column()
  maker_id: string;

  @ManyToOne(() => MemberInfo, (mi) => mi.stragetyOperatedList)
  @JoinColumn({ name: 'maker_id' })
  maker: MemberInfo;

  // (2) 운용자 연결(전략 소유자)
  @Column()
  operator_id: string;

  @ManyToOne(() => MemberInfo, (mi) => mi.stragetyMadeList)
  @JoinColumn({ name: 'operator_id' })
  operator: MemberInfo;

  // (3) 누적수익률 차트 데이터
  @OneToMany(() => AccumulateProfitRateChart, (chart) => chart.strategy)
  accumulateProfitRateChart: AccumulateProfitRateChart[];

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
}
