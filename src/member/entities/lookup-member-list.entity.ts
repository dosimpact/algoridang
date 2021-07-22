import { IsNumber } from 'class-validator';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'lookup-member-list' })
export class LookupMemberList {
  @IsNumber()
  @PrimaryColumn()
  strategy_code: number;

  @IsNumber()
  @PrimaryColumn()
  lookup_customer_id: string;
}
