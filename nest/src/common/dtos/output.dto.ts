import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreOutput {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error?: string;
}

@ObjectType()
export class CorePaginationOutput {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => Int, { nullable: true })
  totalPage?: number;

  @Field(() => Int, { nullable: true })
  totalResult?: number;
}
