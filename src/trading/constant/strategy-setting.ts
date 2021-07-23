export enum StrategyName {
  GoldenCross = 'GoldenCross',
  SMA = 'SMA',
}

export interface StrategyValue {
  GoldenCross: {
    SMA_A: number;
    SMA_B: number;
  };
  SMA: {
    SMA_A: number;
  };
}
type SName = keyof StrategyValue;

export interface SettingJSON {
  name: SName;
  setting: Partial<StrategyValue>;
}

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

// const SettingJSONGolden1: SettingJSON1 = {
//   name: 'GoldenCross',
//   setting: { GoldenCross: { SMA_A: 2, SMA_B: 1 } },
// };
