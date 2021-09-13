import React, { useEffect } from 'react';
import { useTodo } from 'states/apollo/useTodoQueries';

const GqlPrac03 = () => {
  const [getTodo, { loading, data }] = useTodo();
  useEffect(() => {
    getTodo({ variables: { getTodoInput: { term: 'first' } } });
    return () => {};
  }, [getTodo]);

  return (
    <div>
      {loading ? 'loading' : ' complete'}
      <pre>{JSON.stringify(data, null, 2)}</pre>;
    </div>
  );
};

export { GqlPrac03 };
