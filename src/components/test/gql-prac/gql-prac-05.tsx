import React, { useCallback, useState } from 'react';
import { useCreateTodo } from 'states/apollo/useTodoMutations';
import { gql_QueryTodos } from 'states/apollo/useTodoQueries';

const GqlPrac05 = () => {
  const [content, setContent] = useState('');
  const [createTodo, { data, error, loading }] = useCreateTodo();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (content) {
        createTodo({
          variables: {
            createTodoInput: { content },
          },
          refetchQueries: [
            {
              query: gql_QueryTodos,
            },
          ],
        });
        setContent('');
      }
    },
    [content, createTodo],
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo">Creaet Todo</label>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
      </form>
      <div>{loading ? 'loading..' : ''}</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export { GqlPrac05 };
