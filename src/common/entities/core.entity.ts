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
  @UpdateDateColumn()
  updateAt: Date;

  @Field(() => Date)
  @CreateDateColumn()
  createAt: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  deleteAt: Date;

  @Field(() => Int)
  @VersionColumn()
  v: number;
}
