import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Todo } from '../entities/todo.entity';

@InputType()
export class GetTodoInput {
  @IsString()
  @Field(() => String)
  term: string;
}

@ObjectType()
export class GetTodoOutput extends CoreOutput {
  @Field(() => Todo, { nullable: true })
  todo?: Todo;
}

@InputType()
export class GetTodosInput {}

@ObjectType()
export class GetTodosOutput extends CoreOutput {
  @Field(() => [Todo], { nullable: true })
  todo?: Todo[];
}
