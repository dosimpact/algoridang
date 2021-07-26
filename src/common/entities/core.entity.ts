import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNumber } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  VersionColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class CoreEntity {
  @IsNumber()
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @IsDate()
  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz' }) // defaultType : withoutTZ(offset을 무시하겠다.)
  updateAt: Date;

  @IsDate()
  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date;

  @IsDate()
  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ type: 'timestamptz' })
  deleteAt: Date;

  @IsNumber()
  @Field(() => Int)
  @VersionColumn()
  v: number;
}
