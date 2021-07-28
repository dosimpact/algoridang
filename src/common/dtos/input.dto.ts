import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CorePaginationInput {
  @IsNumber()
  @Field(() => Int, { nullable: true })
  skip?: number;

  @IsNumber()
  @Field(() => Int, { nullable: true })
  take?: number;
}
