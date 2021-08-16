/**
 * Query
 */

import { CoreOutput } from "../common/dtos";
import {
  AccumulateProfitRateChart,
  BacktestDailyProfitRateChart,
  BacktestMontlyProfitRateChart,
  BacktestWinRatio,
  History,
} from "./entities";

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

/**
 * Mutation
 */

export interface CreateInvestProfitInfoInput {
  invest_principal?: string; // 투자 원금
  securities_corp_fee?: string; // 수수료
  invest_start_date: string;
  invest_end_date?: string;
}
