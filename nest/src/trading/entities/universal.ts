import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Corporation } from 'src/finance/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MemberStrategy } from '../../strategy/entities/member-strategy.entity';
import { SettingJSON, StrategyName } from '../constant/strategy-setting';
import { SimpleBacktest } from './simple-backtest.entity';

// 유니버스 테이블
@Entity({ name: 'universal' })
export class Universal {
  @IsNumber()
  @PrimaryGeneratedColumn()
  universal_code: number;
  // 유니버셜의 종목 선택 여부
  // @IsBoolean()
  // @IsOptional()
  // @Column({ default: false })
  // select_yes_no?: boolean;
  // 시작 날짜와 끝 날짜
  // @IsDateString()
  // @Column({ type: 'timestamptz', nullable: true })
  // start_date?: string;

  // @IsDateString()
  // @IsOptional()
  // @Column({ type: 'timestamptz', nullable: true })
  // end_date?: string;
  // 해당 종목을 돌릴 전략이름과 셋팅
  @IsEnum(StrategyName)
  @Column({
    type: 'enum',
    enum: StrategyName,
    default: StrategyName.GoldenCross,
  })
  trading_strategy_name: StrategyName;

  @IsString()
  @Column({ type: 'json', default: {} })
  setting_json: SettingJSON;

  // 1:1
  // 유니버셜의 심플백테 결과
  @OneToOne(() => SimpleBacktest, (sbt) => sbt.universal)
  simpleBacktest: SimpleBacktest;

  // 1:N
  // (1) 유니버셜 튜블은 1개의 전략을 부모로 가진다.
  @IsString()
  @Column()
  strategy_code: string;
  @ManyToOne(() => MemberStrategy, (st) => st.universal, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'strategy_code' })
  memberStrategy: MemberStrategy;

  // (2) 유니버셜 튜블은 1개의 종목을 가진다.
  @IsString()
  @Column()
  ticker: string;

  @ManyToOne(() => Corporation, (corp) => corp.universal)
  @JoinColumn({ name: 'ticker' })
  corporation: Corporation;
}
