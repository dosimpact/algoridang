import React, { useState } from 'react';
import { useRecoilValue, useRecoilState, atom, selector } from 'recoil';

interface IMyTodo {
  content: string;
  finished: boolean;
}

const atom_myTodos = atom<IMyTodo[]>({
  key: 'myTodos',
  default: [
    {
      content: 'algo',
      finished: false,
    },
    {
      content: 'ts-enum',
      finished: true,
    },
    {
      content: 'motivation',
      finished: true,
    },
    {
      content: 'workout',
      finished: false,
    },
  ],
});

const select_todosNotFin = selector({
  key: 'todosNotFin',
  get: ({ get }) => {
    const todos = get(atom_myTodos);
    return todos.filter((todo) => todo.finished === false);
  },
});

const select_todosFin = selector({
  key: 'todosFin',
  get: ({ get }) => {
    const todos = get(atom_myTodos);
    return todos.filter((todo) => todo.finished === true);
  },
});

const TodoCreate = () => {
  const [todos, setTodos] = useRecoilState(atom_myTodos);
  const [uinput, setUinput] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uinput) {
      setTodos((prev) => [...prev, { content: uinput, finished: false }]);
      setUinput('');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setUinput(e.target.value)}></input>
      </form>
    </div>
  );
};

const TodoListNotFin = () => {
  const todos = useRecoilValue(select_todosNotFin);
  return <div>{JSON.stringify(todos)}</div>;
};

const TodoListFin = () => {
  const todos = useRecoilValue(select_todosFin);
  return <div>{JSON.stringify(todos)}</div>;
};

const Recoil02 = () => {
  return (
    <div>
      <h2>Recoil02</h2>
      <TodoCreate />
      <div>FIN</div>
      <TodoListFin />
      <div>NOT FIN</div>
      <TodoListNotFin />
    </div>
  );
};

export { Recoil02 };
