import { IsNumber } from 'class-validator';
import { MemberStrategy } from 'src/strategy/entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'invest_profit_info' })
export class InvestProfitInfo {
  @PrimaryGeneratedColumn()
  invest_profit_info_code: number;

  @IsNumber()
  @Column({ type: 'bigint', default: 10000000 })
  invest_price: number; // 평가 금액 = 투자원금+총수익금

  @IsNumber()
  @Column({ type: 'bigint' })
  invest_principal: number; // 투자 원금

  @IsNumber()
  @Column({ type: 'bigint', nullable: true })
  total_profit_price: number; //  총 수익금

  @IsNumber()
  @Column({ type: 'numeric', precision: 3, nullable: true })
  profit_rate: number;

  @IsNumber()
  @Column({ type: 'numeric', precision: 3, nullable: true })
  securities_corp_fee;

  @Column({ type: 'timestamptz' })
  invest_start_date: Date;

  @Column({ type: 'timestamptz', nullable: true })
  invest_end_date: Date;

  // 1:N
  // (1) 대상 전략의 수익
  @Column()
  strategy_code: number;

  @OneToOne(() => MemberStrategy, (ms) => ms.investProfitInfo)
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;
}
