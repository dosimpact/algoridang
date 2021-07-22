import { IsNumber } from 'class-validator';
import { MemberStrategy } from 'src/strategy/entities/member-strategy.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { MemberInfo } from './member-info.entity';

// NM mapping table
// 사용자가 운용중인 전략을 매핑해준다.
@Entity({ name: 'operation-member-list' })
export class OperationMemberList {
  @IsNumber()
  @PrimaryColumn()
  strategy_code: number;

  @ManyToOne(() => MemberStrategy, (ms) => ms.operationMemberList)
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;

  @IsNumber()
  @PrimaryColumn()
  operation_customer_id: string;

  @ManyToOne(() => MemberInfo, (memberInfo) => memberInfo.operationStragetyList)
  @JoinColumn({ name: 'operation_customer_id' })
  operation_customer: MemberInfo;
}
