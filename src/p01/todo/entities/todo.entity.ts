import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
@InputType('TodoInput', { isAbstract: true })
@ObjectType()
export class Todo extends CoreEntity {
  @IsString()
  @Column()
  @Field(() => String)
  content: string;

  @IsBoolean()
  @Column({ default: false })
  @Field(() => Boolean)
  finished: boolean;
}
