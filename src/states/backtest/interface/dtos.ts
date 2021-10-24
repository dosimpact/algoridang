/**
 * Query
 */

import { RequestFS, RequestFSData } from 'states/finance/interface/entities';
import { StrategyName } from 'states/trading/interface/entities';
import { CoreOutput } from '../../common/interface/dtos';
import {
  AccumulateProfitRateChart,
  BacktestDailyProfitRateChart,
  BacktestMontlyProfitRateChart,
  BacktestWinRatio,
  History,
} from './entities';

// 전략에 대한 히스토리 획득
export interface GetHistoryListInput {
  strategy_code: string;
}
export interface GetHistoryListOutput extends CoreOutput {
  historyList?: History[];
}

export interface GetAccumulateProfitRateChartListInput {
  strategy_code: string;
}
export interface GetAccumulateProfitRateChartListOutput extends CoreOutput {
  accumulateProfitRateChartList?: AccumulateProfitRateChart[];
}

export interface GetMontlyProfitRateChartListInput {
  strategy_code: string;
}
export interface GetMontlyProfitRateChartListOutput extends CoreOutput {
  montlyProfitRateChartList?: BacktestMontlyProfitRateChart[];
}

export interface GetDailyProfitRateChartListInput {
  strategy_code: string;
}
export interface GetDailyProfitRateChartListOutput extends CoreOutput {
  dailyProfitRateChartList: BacktestDailyProfitRateChart[];
}

export interface GetBacktestWinRatioInput {
  strategy_code: string;
}
export interface GetBacktestWinRatioOutput extends CoreOutput {
  backtestWinRatio: BacktestWinRatio;
}

// 미니 백테스팅 DTO
export interface RequestMiniBacktestingInput {
  ticker: string;
  salestrategy: StrategyName;
  setting: number[];
  data: {
    startTime: string; //"20190101",
    endTime: string; //""
  };
}
export interface RequestMiniBacktestingOutput extends CoreOutput {
  message?: string;
  code?: string;
  res?: {
    profit_rate: number;
    year_avg_profit_rate: number;
    mdd: number;
  };
}

/**
 * Mutation
 */

export interface CreateInvestProfitInfoInput {
  invest_principal?: string; // 투자 원금
  securities_corp_fee?: string; // 수수료
  invest_start_date: string;
  invest_end_date?: string;
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

// 퀀트 종목 발굴 - input
export interface RequestQuantSelectInput {
  strategy: number;
  numberOfData: number;
  data: RequestFSData;
}
// 퀀트 종목 발굴 - output
export interface RequestQuantSelectOutput extends CoreOutput {
  result: Record<string, [string, string]>;
}
// 발굴 가능한 전략 리스트들 출력
export interface RequestQuantSelectLookUpOutput extends CoreOutput {
  strategy: Record<string, string>;
}
// 전략 기본 셋팅값 요청
export interface RequestQuantSelectDefaultOutput extends CoreOutput {
  requestFS: RequestFS;
}
