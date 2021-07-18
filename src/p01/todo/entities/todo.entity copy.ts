import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
@InputType('TodoInput', { isAbstract: true })
@ObjectType()
export class Todo {
  @IsString()
  @Column()
  @Field(() => String)
  content: string;

  @IsBoolean()
  @Column({ default: false })
  @Field(() => Boolean)
  finished: boolean;

  @PrimaryColumn({ type: 'timetz' })
  DATE: Date;

  @PrimaryColumn({ type: 'varchar', length: 10 })
  STOCK_CODE: string;
}
