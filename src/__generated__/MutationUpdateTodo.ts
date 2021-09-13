/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateTodoInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: MutationUpdateTodo
// ====================================================

export interface MutationUpdateTodo_updateTodo_todo {
  __typename: 'Todo';
  content: string;
  createAt: any;
  deleteAt: any | null;
  finished: boolean;
  id: number;
  updateAt: any;
  v: number;
}

export interface MutationUpdateTodo_updateTodo {
  __typename: 'UpdateTodoOutput';
  error: string | null;
  ok: boolean;
  todo: MutationUpdateTodo_updateTodo_todo | null;
}

export interface MutationUpdateTodo {
  updateTodo: MutationUpdateTodo_updateTodo;
}

export interface MutationUpdateTodoVariables {
  updateTodoInput: UpdateTodoInput;
}
