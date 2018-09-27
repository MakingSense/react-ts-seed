import * as React from 'react';

import { GeneralModel, TodoModel } from '../../models';

export interface ILoginProps {
  todoMap: GeneralModel.IEntityMap<TodoModel.ITodo>;
  fetchTodoList: () => void;
}

export interface ILoginState { }

export default class Login extends React.PureComponent<ILoginProps, ILoginState> {
  public componentDidMount() {
    const { fetchTodoList } = this.props;
    fetchTodoList();
  }

  public render() {
    const { todoMap } = this.props;
    const todoList = Object.values(todoMap);
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
  }
}
