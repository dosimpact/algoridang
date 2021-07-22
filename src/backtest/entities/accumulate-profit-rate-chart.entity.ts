import { IsDate, IsNumber } from 'class-validator';
import { MemberStrategy } from 'src/strategy/entities';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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

  @IsDate()
  @Column({ type: 'timestamptz' })
  chart_rate: Date;

  // 1:N 관계
  // (1) 차트에 대한 원본 전략 매핑
  @IsNumber()
  @Column()
  strategy_code: number;

  @ManyToOne(() => MemberStrategy, (ms) => ms.accumulateProfitRateChart)
  strategy: MemberStrategy;
}
