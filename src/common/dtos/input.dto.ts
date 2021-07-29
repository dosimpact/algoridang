import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class CorePaginationInput {
  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  skip?: number;

  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  take?: number;
}
