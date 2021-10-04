import React from 'react';
import { useTodos } from 'states/apollo/useTodoQueries';

const GqlPrac02 = () => {
  const { data } = useTodos();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export { GqlPrac02 };
