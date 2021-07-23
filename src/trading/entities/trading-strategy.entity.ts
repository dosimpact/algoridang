import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BasicTradingStrategy } from './basic-trading-strategy.entity';

@Entity({ name: 'trading_strategy' })
export class TradingStrategy {
  @PrimaryGeneratedColumn()
  trading_strategy_code: number;

  @Column({ type: 'varchar', length: 15 })
  trading_strategy_name: string;

  // 1:1
  // (1) 매매전략 디폴트값 매핑 테이블
  @OneToOne(() => BasicTradingStrategy, (bts) => bts.trading_strategy)
  basicTradingStrategy: BasicTradingStrategy;

  // 1:N
  // (2) 이 매매전략을 사용하는 리스트
}
