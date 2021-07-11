import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CreateTodoInput,
  DeleteTodoInput,
  UpdateTodoInput,
} from './dtos/mutation.dto';
import { GetTodoInput } from './dtos/query.dtos';
import { TodoService } from './todo.service';

@Controller('api/v1/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('')
  async getTodos() {
    return this.todoService.getTodos();
  }

  @Post('/create')
  async createTodo(@Body() createTodoInput: CreateTodoInput) {
    return this.todoService.createTodo(createTodoInput);
  }
  @Post('/update')
  async updateTodo(@Body() updateTodoInput: UpdateTodoInput) {
    return this.todoService.updateTodo(updateTodoInput);
  }
  @Post('delete')
  async deleteTodo(@Body() deleteTodoInput: DeleteTodoInput) {
    return this.todoService.deleteTodo(deleteTodoInput);
  }

  @Get('/:term')
  async getTodo(@Param('term') term) {
    const getTodoInput: GetTodoInput = { term };
    return this.todoService.getTodo(getTodoInput);
  }
}
