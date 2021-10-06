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

// export interface SettingJSON2<T extends keyof StrategyValue> {
//   name: T;
//   setting: Pick<StrategyValue, T>;
// }

// example) 전략이름을 고르면, 해당되는 value가 설정된다.
// const SettingJSONGolden: SettingJSON<'GoldenCross'> = {
//   name: 'GoldenCross',
//   setting: {
//     GoldenCross: { SMA_A: 1, SMA_B: 2 },
//   },
// };

const SettingJSONGolden1: SettingJSONFull = {
  name: 'GoldenCross',
  setting: { GoldenCross: { pfast: 5, pslow: 20 } },
};
