import { InternalServerErrorException, Logger } from '@nestjs/common';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { MemberStrategy } from 'src/strategy/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { LookupMemberList } from './lookup-member-list.entity';
import { OperationMemberList } from './operation-member-list.entity';
import * as bcrypt from 'bcrypt';
import { InputType, ObjectType } from '@nestjs/graphql';

export enum UserRole {
  Normal = 'Normal',
  Admin = 'Admin',
  DAServer = 'DAServer',
}

@InputType('MemberInfoInput', { isAbstract: true })
@ObjectType()
@Entity({ name: 'member_info' })
export class MemberInfo {
  @IsEmail()
  @PrimaryColumn({ type: 'varchar', length: 255 })
  email_id: string;

  @IsString()
  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @IsString()
  @Column({ type: 'varchar', length: 15 })
  member_name: string;

  @IsEnum(UserRole)
  @Column({ type: 'enum', enum: UserRole, default: UserRole.Normal })
  role: UserRole;

  @IsBoolean()
  @Column({ type: 'boolean', default: false })
  verified: boolean;

  // 1:N
  // (1) 사용자는 여러개의 운용중인 전략을 갖는다. ( 내가 운용중인 전략들(forked+my) )
  @OneToMany(() => MemberStrategy, (ms) => ms.maker)
  stragetyOperatedList: MemberStrategy[];

  // (2) 사용자는 여러개의 전략을 만들 수 있다. (내가 제작한 전략들)
  @OneToMany(() => MemberStrategy, (ms) => ms.operator)
  stragetyMadeList: MemberStrategy[];

  // NM
  // (1) 내가 운용중인 전략들의 원본 (fork전의 원본들)
  @OneToMany(() => OperationMemberList, (om) => om.operation_customer)
  operationStragetyList: OperationMemberList[];

  // (2) 내가 조회했던 전략들
  @OneToMany(() => LookupMemberList, (lm) => lm.lookup_customer)
  lookupStragetyList: LookupMemberList[];

  // entity 기능

  // 사용자 생성/비번 업데이트시 SHA256 암호화
  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string) {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (error) {
      new Logger().error(error);
      throw new InternalServerErrorException();
    }
  }
}
