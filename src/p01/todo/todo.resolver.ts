import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateTodoInput,
  CreateTodoOutput,
  DeleteTodoInput,
  DeleteTodoOutput,
  UpdateTodoInput,
  UpdateTodoOutput,
} from './dtos/mutation.dto';
import { GetTodoInput, GetTodoOutput, GetTodosOutput } from './dtos/query.dtos';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

@Resolver((of) => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query((returns) => CreateTodoOutput)
  async getTodo(@Args('input') getTodoInput: GetTodoInput) {
    return this.todoService.getTodo(getTodoInput);
  }
  @Query((returns) => GetTodosOutput)
  async getTodos() {
    return this.todoService.getTodos();
  }

  @Mutation((returns) => CreateTodoOutput)
  async createTodo(@Args('input') createTodoInput: CreateTodoInput) {
    return this.todoService.createTodo(createTodoInput);
  }
  @Mutation((returns) => UpdateTodoOutput)
  async updateTodo(@Args('input') updateTodoInput: UpdateTodoInput) {
    return this.todoService.updateTodo(updateTodoInput);
  }
  @Mutation((returns) => DeleteTodoOutput)
  async deleteTodo(@Args('input') deleteTodoInput: DeleteTodoInput) {
    return this.todoService.deleteTodo(deleteTodoInput);
  }
}
