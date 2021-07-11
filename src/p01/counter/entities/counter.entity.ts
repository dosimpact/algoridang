import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
@InputType('CounterInput', { isAbstract: true })
export class Counter {
  @IsNumber()
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @Field(() => Int)
  @Column({ default: 0 })
  cnt: number;

  @IsString()
  @Field(() => Int)
  @Column()
  name: string;
}
