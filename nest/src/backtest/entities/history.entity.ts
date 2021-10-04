import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
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

  @IsDateString()
  @Column({ type: 'timestamptz' })
  history_date: Date;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  buy_sale_price?: number;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  profit_loss_rate?: number;

  // 1:N
  // (1) 어떤 전략의 히스토리? 연결
  @IsNumber()
  @Column()
  strategy_code: number; // 전략 코드

  @ManyToOne(() => MemberStrategy, (ms) => ms.histories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;

  // (2) 어떤 회사의 히스토리인지
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  ticker?: string; // 티커 //

  // db의 ticker가 사라져도 global고유값이 ticker는 살리도록
  // 회사는 구지 이 history을 알 필요는 없으니 단방향 연결을 했음
  @ManyToOne(() => Corporation, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'ticker' })
  corporation: Corporation;
}
