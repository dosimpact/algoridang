import { CoreOutput } from '../../common/interface/dtos';
import {
  BaseTradingStrategy,
  SettingJSON,
  StrategyName,
  Universal,
} from './entities';

// query DTOs
export interface GetBaseTradingStrategyInput {
  trading_strategy_name: StrategyName;
}
export interface GetBaseTradingStrategyOutput extends CoreOutput {
  baseTradingStrategy?: BaseTradingStrategy;
}

export interface GetBaseTradingStrategyListInput {}
export interface GetBaseTradingStrategyListOutput extends CoreOutput {
  baseTradingStrategyList?: BaseTradingStrategy[];
}

// mutation DTOs

export interface AddUniversalOnlyInput {
  strategy_code: string;
  ticker: string;
  // start_date: string;
  // end_date: string;
  // select_yes_no?: boolean;
}

export interface AddUniversalOnlyOutput extends CoreOutput {
  universal?: Universal;
}

export interface AddUniversalInput extends AddUniversalOnlyInput {
  strategy_code: string;
  trading_strategy_name: StrategyName;
  setting_json: SettingJSON;
}

export interface AddUniversalOutput extends CoreOutput {
  universal?: Universal;
}
