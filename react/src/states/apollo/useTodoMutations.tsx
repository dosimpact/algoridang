import { gql, useMutation } from '@apollo/client';
import {
  MutationCreateTodo,
  MutationCreateTodoVariables,
} from '__generated__/MutationCreateTodo';
import {
  MutationUpdateTodo,
  MutationUpdateTodoVariables,
} from '__generated__/MutationUpdateTodo';
import {
  MutationDeleteTodo,
  MutationDeleteTodoVariables,
} from '__generated__/MutationDeleteTodo';

export const gql_MutationCreateTodo = gql`
  mutation MutationCreateTodo($createTodoInput: CreateTodoInput!) {
    createTodo(input: $createTodoInput) {
      error
      ok
      todo {
        content
        createAt
        deleteAt
        finished
        id
        updateAt
        v
      }
    }
  }
`;

export const useCreateTodo = () => {
  return useMutation<MutationCreateTodo, MutationCreateTodoVariables>(
    gql_MutationCreateTodo,
  );
};

export const gql_MutationUpdateTodo = gql`
  mutation MutationUpdateTodo($updateTodoInput: UpdateTodoInput!) {
    updateTodo(input: $updateTodoInput) {
      error
      ok
      todo {
        content
        createAt
        deleteAt
        finished
        id
        updateAt
        v
      }
    }
  }
`;

export const useUpdateTodo = () => {
  return useMutation<MutationUpdateTodo, MutationUpdateTodoVariables>(
    gql_MutationUpdateTodo,
  );
};

export const gql_MutationDeleteTodo = gql`
  mutation MutationDeleteTodo($deleteTodoInput: DeleteTodoInput!) {
    deleteTodo(input: $deleteTodoInput) {
      error
      ok
      todo {
        content
        createAt
        deleteAt
        finished
        id
        updateAt
        v
      }
    }
  }
`;
export const useDeleteTodo = () => {
  return useMutation<MutationDeleteTodo, MutationDeleteTodoVariables>(
    gql_MutationDeleteTodo,
  );
};
