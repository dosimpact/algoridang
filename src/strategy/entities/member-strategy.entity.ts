import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { OperationMemberList } from 'src/member/entities/operation-member-list.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum InvestType {
  Unclassified = 'Unclassified', // 0 - 미분류
  StableIncome = 'StableIncome', // 1 - 수익 안정형
  Neutral = 'Neutral', // 2 - 중립형
  RiskTaking = 'RiskTaking', // 3 - 위험추구형
}

@Entity({ name: 'member-strategy' })
export class MemberStrategy {
  @IsNumber()
  @PrimaryGeneratedColumn()
  strategy_code: number;

  @IsString()
  @Column({ type: 'varchar', length: 30 })
  strategy_name: string;

  @IsDate()
  @CreateDateColumn({ type: 'timestamptz' })
  create_date: Date;

  @IsEnum(InvestType)
  @Column({ type: 'enum', enum: InvestType, default: InvestType.Neutral })
  invest_type: InvestType;

  @IsBoolean()
  @Column()
  strategy_explanation: boolean;

  @IsBoolean()
  @Column()
  alarm_setting: boolean;

  @IsBoolean()
  @Column()
  investment_game_invest_delete_yes_no: boolean;

  @IsBoolean()
  @Column()
  open_yes_no: boolean;

  // 1:1 관계
  // (1) 1개의 백테스트 큐를 가진다.

  // n:1 관계

  // n:m 관계

  @OneToMany(() => OperationMemberList, (om) => om.strategy_code)
  operationMemberList: OperationMemberList;
}
