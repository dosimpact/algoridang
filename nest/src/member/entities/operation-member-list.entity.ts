import { IsNumber, IsString } from 'class-validator';
import { MemberStrategy } from 'src/strategy/entities/member-strategy.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { MemberInfo } from './member-info.entity';

// NM mapping table
// 전략은 origin과 fork 전략이 같은 table에 공존하고 있음
// 특정 전략을 fork 하면, fork한 사람들을 매핑해주는 매핑 테이블을 만든다.
@Entity({ name: 'operation_member_list' })
export class OperationMemberList {
  @IsString()
  @PrimaryColumn()
  strategy_code: string;

  @ManyToOne(() => MemberStrategy, (ms) => ms.operationMemberList, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;

  @IsNumber()
  @PrimaryColumn({ type: 'varchar', length: 255 })
  operation_customer_id: string;

  @ManyToOne(
    () => MemberInfo,
    (memberInfo) => memberInfo.operationStragetyList,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'operation_customer_id' })
  operation_customer: MemberInfo;
}
