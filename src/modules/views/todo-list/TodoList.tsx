import React, { memo, useMemo, useEffect } from 'react';

import { GeneralModel, TodoModel } from '../../models';

export interface ITodoListProps {
  todoMap: GeneralModel.IEntityMap<TodoModel.ITodo>;
  fetchTodoList: () => void;
}

const TodoList = ({ todoMap, fetchTodoList }: ITodoListProps) => {
  useEffect(() => { fetchTodoList(); }, []); // eslint-disable-line

  const todoList = useMemo(() => Object.values(todoMap), [todoMap]);
  return (
    <div className="container" key="TodoList">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>name</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {
            todoList.map(todo => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.name}</td>
                <td>{todo.description}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default memo(TodoList);
