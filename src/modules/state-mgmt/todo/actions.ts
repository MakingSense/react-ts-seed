import { TodoModel } from '../../models';

export enum ActionType {
  FETCH_START = '[todo] fetch start',
  FETCH_SUCCESS = '[todo] fetch success'
}

export const actions = {
  fetchStart: () => ({ type: ActionType.FETCH_START, payload: null }),
  fetchSuccess: (todoList: TodoModel.ITodo[]) => ({ type: ActionType.FETCH_SUCCESS, payload: { todoList } })
};
