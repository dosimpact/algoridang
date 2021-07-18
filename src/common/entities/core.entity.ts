import { Field, Int, ObjectType } from '@nestjs/graphql';
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
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz' }) // defaultType : withoutTZ(offset을 무시하겠다.)
  updateAt: Date;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn({ type: 'timestamptz' })
  deleteAt: Date;

  @Field(() => Int)
  @VersionColumn()
  v: number;
}
