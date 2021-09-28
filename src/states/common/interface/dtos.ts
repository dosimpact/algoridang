export interface CorePaginationInput {
  skip?: number;
  take?: number;
}

export interface CoreOutput {
  ok: boolean;
  error?: string;
}

export interface CorePaginationOutput {
  ok: boolean;
  error?: string;
  totalPage: number;
  totalResult: number;
}
