import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import {
  AccumulateProfitRateChart,
  BacktestDailyProfitRateChart,
  BacktestMontlyProfitRateChart,
  BacktestWinRatio,
  History,
} from '../entities';

// 전략에 대한 히스토리 획득
export class GetHistoryListInput {
  @IsNumber()
  strategy_code: string;
}
export class GetHistoryListOutput extends CoreOutput {
  historyList?: History[];
}

export class GetAccumulateProfitRateChartListInput {
  @IsNumber()
  strategy_code: string;
}
export class GetAccumulateProfitRateChartListOutput extends CoreOutput {
  accumulateProfitRateChartList?: AccumulateProfitRateChart[];
}

export class GetMontlyProfitRateChartListInput {
  @IsNumber()
  strategy_code: string;
}
export class GetMontlyProfitRateChartListOutput extends CoreOutput {
  montlyProfitRateChartList?: BacktestMontlyProfitRateChart[];
}

export class GetDailyProfitRateChartListInput {
  @IsNumber()
  strategy_code: string;
}
export class GetDailyProfitRateChartListOutput extends CoreOutput {
  dailyProfitRateChartList: BacktestDailyProfitRateChart[];
}

export class GetBacktestWinRatioInput {
  @IsNumber()
  strategy_code: string;
}
export class GetBacktestWinRatioOutput extends CoreOutput {
  backtestWinRatio: BacktestWinRatio;
}
