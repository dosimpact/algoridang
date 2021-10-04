import { IsNumber, IsString } from 'class-validator';
import { MemberStrategy } from 'src/strategy/entities';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { MemberInfo } from './member-info.entity';

@Entity({ name: 'lookup_member_list' })
export class LookupMemberList {
  @IsString()
  @PrimaryColumn()
  strategy_code: string;

  @ManyToOne(() => MemberStrategy, (ms) => ms.lookupMemberList, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;

  @IsNumber()
  @PrimaryColumn({ type: 'varchar', length: 255 })
  lookup_customer_id: string;

  @ManyToOne(() => MemberInfo, (mi) => mi.lookupStragetyList, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lookup_customer_id' })
  lookup_customer: MemberInfo;
}
