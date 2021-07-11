import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Todo } from '../entities/todo.entity';

@InputType()
export class CreateTodoInput extends PickType(Todo, ['content']) {}

@ObjectType()
export class CreateTodoOutput extends CoreOutput {
  @Field(() => Todo, { nullable: true })
  todo?: Todo;
}

@InputType()
export class UpdateTodoInput extends PartialType(
  PickType(Todo, ['content', 'finished'] as const),
) {
  @IsNumber()
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class UpdateTodoOutput extends CoreOutput {
  @Field(() => Todo, { nullable: true })
  todo?: Todo;
}

@InputType()
export class DeleteTodoInput {
  @IsNumber()
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class DeleteTodoOutput extends CoreOutput {
  @Field(() => Todo, { nullable: true })
  todo?: Todo;
}
