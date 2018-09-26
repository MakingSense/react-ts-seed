import { GeneralModel, TodoModel } from '../../models';

export interface IState {
  todoMap: GeneralModel.IEntityMap<TodoModel.ITodo>;
}

export const initialState: IState = {
  todoMap: {}
};
