import { IsNumber } from 'class-validator';
import { MemberStrategy } from 'src/strategy/entities';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { MemberInfo } from './member-info.entity';

@Entity({ name: 'lookup_member_list' })
export class LookupMemberList {
  @IsNumber()
  @PrimaryColumn()
  strategy_code: number;

  @ManyToOne(() => MemberStrategy, (ms) => ms.lookupMemberList)
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;

  @IsNumber()
  @PrimaryColumn({ type: 'varchar', length: 255 })
  lookup_customer_id: string;

  @ManyToOne(() => MemberInfo, (mi) => mi.lookupStragetyList)
  @JoinColumn({ name: 'lookup_customer_id' })
  lookup_customer: MemberInfo;
}
