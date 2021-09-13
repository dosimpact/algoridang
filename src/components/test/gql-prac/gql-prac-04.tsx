import React, { useEffect } from 'react';
import useTodosNMain from 'states/apollo/useTodoQueries';

const GqlPrac04 = () => {
  const [getTodosNMain, { loading, data }] = useTodosNMain();
  useEffect(() => {
    getTodosNMain({
      variables: {
        getTodoInput: {
          term: 'first',
        },
      },
    });
    return () => {};
  }, [getTodosNMain]);

  return (
    <div>
      {loading ? 'loading' : ' complete'}
      <pre>{JSON.stringify(data, null, 2)}</pre>;
    </div>
  );
};

export { GqlPrac04 };
