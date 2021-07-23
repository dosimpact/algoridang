import { Column, Entity } from 'typeorm';

@Entity({ name: 'trading_strategy_detail_setting' })
export class TradingStrategyDetailSetting {
  trading_strategy_detail_setting_code: number;

  @Column({ type: 'json' })
  setting_json: string;
}
