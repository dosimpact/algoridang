import { Type } from 'class-transformer';
import {
  IsArray,
  IsJSON,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import {
  RequestFS,
  RequestFSData,
} from 'src/finance/entities/financial-statement.entity';
import { StrategyName } from 'src/trading/constant/strategy-setting';
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

// 미니 백테스팅 DTO
export class RequestMiniBacktestingInput {
  @IsString()
  ticker: string;
  @IsString()
  salestrategy: StrategyName;
  @IsArray()
  setting: number[];
  @IsObject()
  data: {
    startTime: string; //"20190101",
    endTime: string; //""
  };
}
export class RequestMiniBacktestingOutput extends CoreOutput {
  message?: string;
  code?: string;
  res?: {
    profit_rate: number;
    year_avg_profit_rate: number;
    mdd: number;
  };
}

// 퀀트 종목 발굴 - input
export class RequestQuantSelectInput {
  @IsNumber()
  strategy: number;
  @IsNumber()
  numberOfData: number;
  // @ValidateNested()
  // @Type()
  @IsObject()
  data: RequestFSData;
}
// 퀀트 종목 발굴 - output
export class RequestQuantSelectOutput extends CoreOutput {
  result: Record<string, [string, string]>;
}
// 발굴 가능한 전략 리스트들 출력
export class RequestQuantSelectLookUpOutput extends CoreOutput {
  strategy: Record<string, string>;
}
// 전략 기본 셋팅값 요청
export class RequestQuantSelectDefaultOutput extends CoreOutput {
  requestFS: RequestFS;
}
