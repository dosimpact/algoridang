/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetTodoInput } from './globalTypes';

// ====================================================
// GraphQL query operation: QueryTodosNMain
// ====================================================

export interface QueryTodosNMain_getTodos_todo {
  __typename: 'Todo';
  content: string;
  finished: boolean;
}

export interface QueryTodosNMain_getTodos {
  __typename: 'GetTodosOutput';
  error: string | null;
  ok: boolean;
  todo: QueryTodosNMain_getTodos_todo[] | null;
}

export interface QueryTodosNMain_getTodo_todo {
  __typename: 'Todo';
  content: string;
  finished: boolean;
}

export interface QueryTodosNMain_getTodo {
  __typename: 'CreateTodoOutput';
  error: string | null;
  ok: boolean;
  todo: QueryTodosNMain_getTodo_todo | null;
}

export interface QueryTodosNMain {
  getTodos: QueryTodosNMain_getTodos;
  getTodo: QueryTodosNMain_getTodo;
}

export interface QueryTodosNMainVariables {
  getTodoInput: GetTodoInput;
}
