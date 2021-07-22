import { IsEmail, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { OperationMemberList } from './operation-member-list.entity';

@Entity({ name: 'member_info' })
export class MemberInfo {
  @IsEmail()
  @PrimaryColumn({ length: 255 })
  email_id: string;

  @IsString()
  @Column({ length: 255 })
  password: string;

  @IsString()
  @Column({ length: 15 })
  member_name: string;

  // NM
  // (1) 사용자가 운용중인 전략들
  @OneToMany(() => OperationMemberList, (om) => om.operation_customer_id)
  operationStragetyList: OperationMemberList;
  // (2) 사용자가 조회했던 전략들
}
