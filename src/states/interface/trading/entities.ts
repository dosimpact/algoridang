import { StockList } from "../strategy/entities";

export interface BaseTradingStrategy {
  trading_strategy_code: number;
  trading_strategy_name: StrategyName;
  setting_json: SettingJSON;
}

export interface CustomTradingStrategy {
  trading_strategy_code: number;
  trading_strategy_name: StrategyName;
  setting_json: SettingJSON;

  // 1:N
  // (1) (deprecated) 커스텀 트레이딩 셋팅이 적용된 사용자전략
  // @Column()
  // stragety_code: number;

  // @OneToMany(() => MemberStrategy, (ms) => ms.customTradingStrategy)
  // @JoinColumn({ name: 'stragety_code' })
  // stragety: MemberStrategy;

  //(2) 해당 전략을 사용하는 종목들 (mapping table)
  stock_lists: StockList[];
}
export enum StrategyName {
  None = "None",
  GoldenCross = "GoldenCross",
  SMA = "SMA",
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
