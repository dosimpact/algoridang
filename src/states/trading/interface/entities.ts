import { Corporation } from 'states/finance/interface/entities';
import { MemberStrategy } from 'states/strategy/interface/entities';

export interface BaseTradingStrategy {
  // trading_strategy_code: string;
  trading_strategy_name: StrategyName;
  setting_json: SettingJSON;
}

export enum StrategyName {
  None = 'None',
  // SMA = 'SMA',
  GoldenCross = 'GoldenCross',
  RSI = 'RSI',
}

export interface StrategyValue {
  // SMA: {
  //   SMA_A: number;
  // };
  GoldenCross: {
    pfast: number;
    pslow: number;
  };
  RSI: {
    min: number;
    max: number;
  };
}

export interface SettingJSONFull {
  name: keyof StrategyValue;
  setting: Partial<StrategyValue>;
}

export type SettingJSON = Partial<StrategyValue>;

export const preSet__BaseTradingStrategy_List: BaseTradingStrategy[] = [
  {
    trading_strategy_name: StrategyName.None,
    setting_json: {},
  },
  {
    trading_strategy_name: StrategyName.GoldenCross,
    setting_json: {
      GoldenCross: {
        pfast: 5,
        pslow: 20,
      },
    },
  },
  {
    trading_strategy_name: StrategyName.RSI,
    setting_json: {
      RSI: { min: 30, max: 70 },
    },
  },
];

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
