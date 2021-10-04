import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';
import { MemberStrategy } from 'src/strategy/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'backtest_monthly_profit_rate_chart' })
export class BacktestMontlyProfitRateChart {
  @IsNumber()
  @PrimaryGeneratedColumn()
  backtest_monthly_profit_rate_chart_code: number;

  @IsDateString()
  @Column({ type: 'timestamptz' })
  chart_month: Date;

  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  profit_rate: number;

  // 1:N
  // 월간수익률-전략매핑
  @IsString()
  @Column({ type: 'bigint' })
  strategy_code: string;

  @ManyToOne(() => MemberStrategy, (ms) => ms.backtestMontlyProfitRateChart, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;
}
