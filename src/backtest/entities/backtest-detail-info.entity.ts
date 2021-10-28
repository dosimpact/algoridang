import { IsNumber, IsString } from 'class-validator';
import { MemberStrategy } from 'src/strategy/entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'backtest_detail_info' })
export class BacktestDetailInfo {
  @IsNumber()
  @PrimaryGeneratedColumn()
  backtest_code: number;

  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  year_avg_profit_rate: number;

  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  mdd: number;

  @IsNumber()
  @Column({ type: 'bigint' })
  trading_month_count: number;

  @IsNumber()
  @Column({ type: 'bigint' })
  rising_month_count: number;

  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  month_avg_profit_rate: number;

  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  monthly_volatility?: number;

  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  sharp?: number;

  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  yearly_volatility?: number;

  @IsString()
  @Column({ type: 'text', nullable: true, select: false })
  quant_state_report?: string;

  @IsString()
  @Column()
  strategy_code: string;

  @OneToOne(() => MemberStrategy, (ms) => ms.backtestDetailInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;
}
