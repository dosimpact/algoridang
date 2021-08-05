import { InputType, ObjectType } from '@nestjs/graphql';
import { IsDate, IsDateString, IsNumber, IsOptional } from 'class-validator';
import { MemberStrategy } from 'src/strategy/entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@InputType('InvestProfitInfo', { isAbstract: true })
@ObjectType()
@Entity({ name: 'invest_profit_info' })
export class InvestProfitInfo {
  @IsNumber()
  @PrimaryGeneratedColumn()
  invest_profit_info_code: number;

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  invest_price?: number; // 평가 금액 = 투자원금+총수익금

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', default: 10000000 })
  invest_principal?: number; // 투자 원금

  @IsNumber()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  total_profit_price?: number; //  총 수익금

  @IsNumber()
  @IsOptional()
  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  profit_rate?: number; // 수익률

  @IsNumber()
  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.01 })
  securities_corp_fee?: number; // 수수료

  @IsDateString()
  @Column({ type: 'timestamptz' })
  invest_start_date: Date;

  @IsDateString()
  @IsOptional()
  @Column({ type: 'timestamptz', nullable: true })
  invest_end_date?: Date;

  // 1:N
  // (1) 대상 전략의 수익
  @Column()
  strategy_code: string;

  @OneToOne(() => MemberStrategy, (ms) => ms.investProfitInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;
}
