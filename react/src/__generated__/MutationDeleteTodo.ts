/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteTodoInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: MutationDeleteTodo
// ====================================================

export interface MutationDeleteTodo_deleteTodo_todo {
  __typename: 'Todo';
  content: string;
  createAt: any;
  deleteAt: any | null;
  finished: boolean;
  id: number;
  updateAt: any;
  v: number;
}

export interface MutationDeleteTodo_deleteTodo {
  __typename: 'DeleteTodoOutput';
  error: string | null;
  ok: boolean;
  todo: MutationDeleteTodo_deleteTodo_todo | null;
}

export interface MutationDeleteTodo {
  deleteTodo: MutationDeleteTodo_deleteTodo;
}

export interface MutationDeleteTodoVariables {
  deleteTodoInput: DeleteTodoInput;
}
