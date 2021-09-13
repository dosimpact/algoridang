import {
  gql,
  useQuery,
  useLazyQuery,
  LazyQueryHookOptions,
} from '@apollo/client';
import { QueryTodo, QueryTodoVariables } from '__generated__/QueryTodo';
import { QueryTodos } from '__generated__/QueryTodos';
import {
  QueryTodosNMain,
  QueryTodosNMainVariables,
} from '__generated__/QueryTodosNMain';

export const gql_QueryTodo = gql`
  query QueryTodo($getTodoInput: GetTodoInput!) {
    getTodo(input: $getTodoInput) {
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

export const useTodo = (
  options?: LazyQueryHookOptions<QueryTodo, QueryTodoVariables>,
) => {
  // 반환 타입, 입력변수 타입
  return useLazyQuery<QueryTodo, QueryTodoVariables>(gql_QueryTodo, options);
};

export const gql_QueryTodos = gql`
  query QueryTodos {
    getTodos {
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

export const useTodos = () => {
  // 반환 타입, 입력변수 타입
  return useQuery<QueryTodos>(gql_QueryTodos);
};

export const gql_QueryTodosNMain = gql`
  query QueryTodosNMain($getTodoInput: GetTodoInput!) {
    getTodos {
      error
      ok
      todo {
        content
        finished
      }
    }
    getTodo(input: $getTodoInput) {
      error
      ok
      todo {
        content
        finished
      }
    }
  }
`;
const useTodosNMain = () => {
  // <반환타입, 입력 타입>
  return useLazyQuery<QueryTodosNMain, QueryTodosNMainVariables>(
    gql_QueryTodosNMain,
  );
};

export default useTodosNMain;
