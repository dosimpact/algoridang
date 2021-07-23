import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'trading_strategy_list' })
export class TradingStrategyList {
  @PrimaryColumn()
  trading_strategy_code: number;

  @PrimaryColumn()
  trading_strategy_detail_setting_code: number;

  @PrimaryColumn()
  strategy_code: number;
}
