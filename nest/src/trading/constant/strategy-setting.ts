import { BaseTradingStrategy } from '../entities';

// 기술적 전략 이름
export enum StrategyName {
  None = 'None',
  GoldenCross = 'GoldenCross',
  RSI = 'RSI',
  BollingerBand = 'BollingerBand',
  MACD = 'MACD',
}

interface StrategyValue {
  GoldenCross: {
    pfast: number;
    pslow: number;
  };
  RSI: {
    min: number;
    max: number;
  };
  BollingerBand: {
    period: number;
  };
  MACD: {
    pfast: number;
    pslow: number;
    value: number;
  };
}
// export interface SettingJSONFull {
//   name: keyof StrategyValue;
//   setting: Partial<StrategyValue>;
// }

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
  {
    trading_strategy_name: StrategyName.BollingerBand,
    setting_json: {
      BollingerBand: { period: 70 },
    },
  },
  {
    trading_strategy_name: StrategyName.MACD,
    setting_json: {
      MACD: { pfast: 12, pslow: 26, value: 9 },
    },
  },
];
