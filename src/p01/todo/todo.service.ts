import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import {
  GetTodoInput,
  GetTodosOutput,
  GetTodoOutput,
  GetTodosInput,
} from './dtos/query.dtos';
import {
  CreateTodoInput,
  CreateTodoOutput,
  DeleteTodoInput,
  DeleteTodoOutput,
  UpdateTodoInput,
  UpdateTodoOutput,
} from './dtos/mutation.dto';

import { Todo } from './entities/todo.entity';

const logger = new Logger('TodoService');

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
  ) {
    const test = async () => {
      const todos = await todoRepo.find({});
      console.log(todos);
    };
    // test();
  }

  async getTodo({ term }: GetTodoInput): Promise<GetTodoOutput> {
    const NumberReg = /^[0-9]*$/;
    try {
      let todo = await this.todoRepo.findOne({ content: Like(`%${term}%`) });
      if (todo)
        return {
          ok: true,
          todo,
        };
      if (NumberReg.test(term)) {
        todo = await this.todoRepo.findOne({ id: Number(term) });
        if (todo)
          return {
            ok: true,
            todo,
          };
      }
      throw new Error('not found');
    } catch (error) {
      return {
        ok: false,
        error: 'cannot get todo',
      };
    }
  }
  async getTodos(): Promise<GetTodosOutput> {
    try {
      const todos = await this.todoRepo.find({});
      return {
        ok: true,
        todo: todos,
      };
    } catch (error) {
      logger.error(error);
      return {
        ok: false,
        error: 'cannot get todos',
      };
    }
  }
  async createTodo({ content }: CreateTodoInput): Promise<CreateTodoOutput> {
    try {
      const todo = await this.todoRepo.save(this.todoRepo.create({ content }));
      return {
        ok: true,
        todo,
      };
    } catch (error) {
      return { ok: false, error: 'cannot create todo' };
    }
  }
  async updateTodo({
    content,
    finished,
    id,
  }: UpdateTodoInput): Promise<UpdateTodoOutput> {
    try {
      const todo = await this.todoRepo.findOneOrFail({ id });
      // const { todo } = await this.getTodo({ term: content });
      if (!todo) throw new Error('cannot found');
      if (content) todo.content = content;
      if (finished) todo.finished = finished;
      await this.todoRepo.save(todo);

      return {
        ok: true,
        todo,
      };
    } catch (error) {
      return { ok: false, error: 'cannot update todo' };
    }
  }
  async deleteTodo({ id }: DeleteTodoInput): Promise<DeleteTodoOutput> {
    try {
      const todo = await this.todoRepo.findOneOrFail({ id });
      await this.todoRepo.softRemove(todo);
      return {
        ok: true,
        todo,
      };
    } catch (error) {
      return { ok: false, error: 'cannot delete todo' };
    }
  }
}
