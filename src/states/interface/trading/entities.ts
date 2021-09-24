import { Corporation } from '../finance/entities';
import { MemberStrategy } from '../strategy/entities';

export interface BaseTradingStrategy {
  trading_strategy_code: string;
  trading_strategy_name: StrategyName;
  setting_json: SettingJSON;
}

export enum StrategyName {
  None = 'None',
  GoldenCross = 'GoldenCross',
  SMA = 'SMA',
}

export interface StrategyValue {
  GoldenCross: {
    pfast: number;
    pslow: number;
  };
  SMA: {
    SMA_A: number;
  };
}
export interface SettingJSONFull {
  name: keyof StrategyValue;
  setting: Partial<StrategyValue>;
}

export type SettingJSON = Partial<StrategyValue>;

export interface SimpleBacktest {
  // todo:refator - 언제 eager인지 아닌지...
  universal_code: number;
  // universal?: Universal;
  MDD: number;
  CAGR: number;
}

export interface Universal {
  universal_code: number;
  // select_yes_no?: boolean;
  // start_date: Date;
  // end_date?: Date;
  trading_strategy_name: StrategyName;
  setting_json: SettingJSON;

  // todo:refator - 언제 eager인지 아닌지...
  simpleBacktest?: SimpleBacktest;
  strategy_code: string;
  memberStrategy?: MemberStrategy;
  ticker: string;
  corporation?: Corporation;
}
