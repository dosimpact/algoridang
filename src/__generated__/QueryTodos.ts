/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryTodos
// ====================================================

export interface QueryTodos_getTodos_todo {
  __typename: 'Todo';
  content: string;
  createAt: any;
  deleteAt: any | null;
  finished: boolean;
  id: number;
  updateAt: any;
  v: number;
}

export interface QueryTodos_getTodos {
  __typename: 'GetTodosOutput';
  error: string | null;
  ok: boolean;
  todo: QueryTodos_getTodos_todo[] | null;
}

export interface QueryTodos {
  getTodos: QueryTodos_getTodos;
}
