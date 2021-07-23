import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { TradingStrategy } from './trading-strategy.entity';

// 매매전략 디폴트값 매핑 테이블
@Entity({ name: 'basic_trading_strategy' })
export class BasicTradingStrategy {
  @PrimaryColumn()
  trading_strategy_code: number; // 어떤 매매전략

  @OneToOne(() => TradingStrategy, (ts) => ts.basicTradingStrategy)
  @JoinColumn({ name: 'trading_strategy_code' })
  trading_strategy: TradingStrategy;

  @PrimaryColumn()
  trading_strategy_detail_setting_code: number; // 어떤 디폴트값
}
