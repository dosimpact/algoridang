/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateTodoInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: MutationCreateTodo
// ====================================================

export interface MutationCreateTodo_createTodo_todo {
  __typename: 'Todo';
  content: string;
  createAt: any;
  deleteAt: any | null;
  finished: boolean;
  id: number;
  updateAt: any;
  v: number;
}

export interface MutationCreateTodo_createTodo {
  __typename: 'CreateTodoOutput';
  error: string | null;
  ok: boolean;
  todo: MutationCreateTodo_createTodo_todo | null;
}

export interface MutationCreateTodo {
  createTodo: MutationCreateTodo_createTodo;
}

export interface MutationCreateTodoVariables {
  createTodoInput: CreateTodoInput;
}
