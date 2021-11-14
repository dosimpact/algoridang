import { IsDateString, IsNumber, IsString } from 'class-validator';
import { MemberStrategy } from 'src/strategy/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'accumulate_profit_rate_chart' })
export class AccumulateProfitRateChart {
  @IsNumber()
  @PrimaryGeneratedColumn()
  accumulate_profit_rate_chart_code: number;

  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  profit_rate: number;

  @IsDateString()
  @Column({ type: 'timestamptz' })
  chart_date: string;

  // 1:N 관계
  // (1) 차트에 대한 원본 전략 매핑
  @IsString()
  @Column({ nullable: true })
  strategy_code: string;

  @ManyToOne(() => MemberStrategy, (ms) => ms.accumulateProfitRateChart, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;
}
