import { CoreOutput } from "../common/dtos";
import {
  BaseTradingStrategy,
  SettingJSON,
  StrategyName,
  Universal,
} from "./entities";

// query DTOs
export interface getBaseTradingStrategyInput {
  trading_strategy_code: string;
}
export interface getBaseTradingStrategyOutput extends CoreOutput {
  baseTradingStrategy?: BaseTradingStrategy;
}

export interface getBaseTradingStrategyListInput {}
export interface getBaseTradingStrategyListOutput extends CoreOutput {
  baseTradingStrategyList?: BaseTradingStrategy[];
}

// mutation DTOs

export interface AddUniversalOnlyInput {
  strategy_code: string;
  ticker: string;
  start_date: string;
  end_date: string;
  select_yes_no?: boolean;
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
