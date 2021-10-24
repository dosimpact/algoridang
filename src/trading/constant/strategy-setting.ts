import { BaseTradingStrategy } from '../entities';

// 기술적 전략 이름
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

// SettingJSON의 json 타입을 정의합니다.
export type SettingJSON = Partial<StrategyValue>;

// 시드를 위한 기술적 지표 JSON 값 리스트 입니다.

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
