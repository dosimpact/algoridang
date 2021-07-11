/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateTodoInput {
  content: string;
}

export interface DeleteTodoInput {
  id: number;
}

export interface GetTodoInput {
  term: string;
}

export interface UpdateTodoInput {
  content?: string | null;
  finished?: boolean | null;
  id: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
