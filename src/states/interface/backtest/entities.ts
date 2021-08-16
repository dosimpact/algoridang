import { CoreOutput } from "../common/dtos";
import { Corporation } from "../finance/entities";
import { MemberStrategy } from "../strategy/entities";

export interface InvestProfitInfo {
  invest_profit_info_code: number;
  invest_price: string; // 평가 금액 = 투자원금+총수익금
  invest_principal: string; // 투자 원금
  total_profit_price: string; //  총 수익금
  profit_rate: string;
  securities_corp_fee: string;
  invest_start_date: Date;
  invest_end_date: Date;
  // 1:N
  // (1) 대상 전략의 수익
  strategy_code: string;
  strategy: MemberStrategy;
}

export interface History {
  history_code: number;
  history_date: string;
  buy_sale_price: number;
  profit_loss_rate: number;
  // 1:N
  // (1) 어떤 전략의 히스토리? 연결
  strategy_code: string; // 전략 코드
  // strategy: MemberStrategy;
  // (2) 어떤 회사의 히스토리인지
  ticker: string; // 티커
  // corporation: Corporation;
}
export interface BacktestWinRatio {
  strategy_code: string;
  strategy: MemberStrategy;
  win_count: number;
  loss_count: number;
}
export enum BacktestState {
  New = "New", // 생성
  Ready = "Ready", // 진입 & 대기중
  Running = "Running", // 작업중
  Success = "Success", // 완료
  Error = "Error", // 애러
}

export interface BacktestQueue {
  queue_code: string;
  state_info: BacktestState;
  word_info: string;
  // (1) 백테스트 큐에 연동된 투자 전략
  strategy_code: string;
  strategy: MemberStrategy;
}
export interface BacktestMontlyProfitRateChart {
  backtest_monthly_profit_rate_chart_code: number;
  chart_month: Date;
  profit_rate: number;
  strategy_code: string;
  strategy: MemberStrategy;
}

export interface BacktestDailyProfitRateChart {
  backtest_daily_profit_rate_chart_code: number;
  chart_month: Date;
  profit_rate: number;
  strategy_code: string;
  strategy: MemberStrategy;
}

export interface BacktestDetailInfo {
  backtest_code: number;
  year_avg_profit_rate: number;
  mdd: number;
  trading_month_count: number;
  rising_month_count: number;
  month_avg_profit_rate: number;
  monthly_volatility: number;
  strategy_code: string;
  strategy: MemberStrategy;
}

export interface AccumulateProfitRateChart {
  accumulate_profit_rate_chart_code: number;
  profit_rate: number;
  chart_rate: Date;
  // 1:N 관계
  // (1) 차트에 대한 원본 전략 매핑
  strategy_code: string;
  strategy: MemberStrategy;
}

export interface SetBackTestOutput extends CoreOutput {
  task_id?: string;
}

export interface PushBackTestQInput {
  strategy_code: string;
}
export interface PushBackTestQOutput extends CoreOutput {
  task_id?: string;
}
