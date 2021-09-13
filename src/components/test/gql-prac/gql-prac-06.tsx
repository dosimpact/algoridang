import React, { useState } from 'react';
import { useUpdateTodo } from 'states/apollo/useTodoMutations';
import { useTodo } from 'states/apollo/useTodoQueries';
import { UpdateTodoInput } from '__generated__/globalTypes';

// update todo
const GqlPrac06 = () => {
  const [getTodo] = useTodo({
    onCompleted: (data) => {
      console.log('check valid todo', data.getTodo);

      if (data.getTodo.ok && tmpTodo) {
        updateTodo({
          variables: {
            updateTodoInput: tmpTodo,
          },
        });
      }
    },
  });

  const [updateTodo, { data }] = useUpdateTodo();
  const [tmpTodo, setTmpTodo] = useState<UpdateTodoInput>({
    id: 0,
    content: '',
    finished: false,
  });

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name === 'id') {
      setTmpTodo((prev) => ({ ...prev, id: Number(e.target.value) }));
    }
    if (name === 'content') {
      setTmpTodo((prev) => ({ ...prev, content: e.target.value }));
    }
    if (name === 'finished') {
      setTmpTodo((prev) => ({ ...prev, finished: Boolean(e.target.checked) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getTodo({ variables: { getTodoInput: { term: String(tmpTodo.id) } } });
    if (tmpTodo) {
      updateTodo({
        variables: {
          updateTodoInput: tmpTodo,
        },
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        id :{' '}
        <input
          type="text"
          value={tmpTodo?.id}
          name="id"
          onChange={handleOnChange}
        ></input>
        content :
        <input
          type="text"
          name="content"
          value={tmpTodo?.content || ''}
          onChange={handleOnChange}
        ></input>
        finished :
        <input
          type="checkbox"
          name="finished"
          checked={tmpTodo?.finished || false}
          onChange={handleOnChange}
        ></input>
        <button type="submit">Update</button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export { GqlPrac06 };
