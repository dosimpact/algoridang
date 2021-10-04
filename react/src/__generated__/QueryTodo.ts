/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetTodoInput } from './globalTypes';

// ====================================================
// GraphQL query operation: QueryTodo
// ====================================================

export interface QueryTodo_getTodo_todo {
  __typename: 'Todo';
  content: string;
  createAt: any;
  deleteAt: any | null;
  finished: boolean;
  id: number;
  updateAt: any;
  v: number;
}

export interface QueryTodo_getTodo {
  __typename: 'CreateTodoOutput';
  error: string | null;
  ok: boolean;
  todo: QueryTodo_getTodo_todo | null;
}

export interface QueryTodo {
  getTodo: QueryTodo_getTodo;
}

export interface QueryTodoVariables {
  getTodoInput: GetTodoInput;
}
