import { IsDate, IsNumber, IsString } from 'class-validator';
import { Corporation } from 'src/finance/entities';
import { MemberStrategy } from 'src/strategy/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'history' })
export class History {
  @IsNumber()
  @PrimaryGeneratedColumn()
  history_code: number;

  @IsDate()
  @Column({ type: 'timestamptz' })
  history_date: Date;

  @IsNumber()
  @Column({ type: 'bigint' })
  buy_sale_price: number;

  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  profit_loss_rate: number;

  // 1:N
  // (1) 어떤 전략의 히스토리? 연결
  @IsNumber()
  @Column()
  strategy_code: number; // 전략 코드

  @ManyToOne(() => MemberStrategy, (ms) => ms.histories)
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;

  // (2) 어떤 회사의 히스토리인지
  @IsString()
  @Column()
  ticker: string; // 티커

  @ManyToOne(() => Corporation)
  @JoinColumn({ name: 'ticker' })
  corporation: Corporation;
}
