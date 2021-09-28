import {
  AccumulateProfitRateChart,
  BacktestDetailInfo,
  BacktestMontlyProfitRateChart,
  BacktestQueue,
  BacktestWinRatio,
  History,
  InvestProfitInfo,
} from 'states/backtest/interface/entities';
import {
  LookupMemberList,
  MemberInfo,
  OperationMemberList,
} from 'states/member/interface/entities';
import { Universal } from 'states/trading/interface/entities';

export enum InvestType {
  Unclassified = 'Unclassified', // 0 - 미분류
  StableIncome = 'StableIncome', // 1 - 수익 안정형
  Neutral = 'Neutral', // 2 - 중립형
  RiskTaking = 'RiskTaking', // 3 - 위험추구형
}

export interface MemberStrategy {
  strategy_code: string;
  strategy_name: string; // 전략 이름
  invest_type: InvestType;
  strategy_explanation: string; // 전략 설명
  operation_yes_no: boolean; // 전략 탐색
  alarm_setting: boolean;
  open_yes_no: boolean;
  image_url: string;
  create_date: Date;
  deleteAt: Date;
  universal_producer?: string;
  status_info: string;
  status_code: string;
  // 1:1 관계
  // (2) 투자 수익 정보
  investProfitInfo: InvestProfitInfo;
  // (3) 백테스트 상세 정보
  backtestDetailInfo: BacktestDetailInfo;
  // (4) 백테스트 승률 정보
  backtestWinRatio: BacktestWinRatio;
  // ------------------------------------------------------------
  // n:1 관계
  // (1) N개의 백테스트 큐를 가진다.
  queueList: BacktestQueue[];
  // (1) 제작자 연결 (전략 author)
  maker_id: string;
  maker: MemberInfo;
  // (2) 운용자 연결(전략 소유자)
  operator_id: string;
  operator: MemberInfo;
  // (3) 누적수익률 차트 데이터
  accumulateProfitRateChart: AccumulateProfitRateChart[];
  // (4) 월간수익률 차트 데이터
  backtestMontlyProfitRateChart: BacktestMontlyProfitRateChart;
  // (5) (deprecated) 전략에 셋팅된 매매전략(셋팅포함)
  // @OneToMany(() => CustomTradingStrategy, (cts) => cts.stragety)
  // customTradingStrategy: CustomTradingStrategy[];
  // ------------------------------------------------------------
  // n:m 관계
  // (1) 전략 운용중인 사용자 리스트
  operationMemberList: OperationMemberList[];
  // (2) 전략을 조회한 사용자 리스트
  lookupMemberList: LookupMemberList[];
  // (3) 전략의 태그 리스트
  hashList: HashList[];
  // (4) 전략의 히스토리
  histories: History[];

  // (5) 전략의 유니버셜 매핑
  universal: Universal[];
}

// NM : 전략 - 해쉬 매핑 테이블
export interface HashList {
  strategy_code: string;

  strategy: MemberStrategy;

  hash_code: number;

  hash: Hash;
}

export interface Hash {
  hash_code: number;
  hash_contents: string;
  strategyList: HashList[];
}
