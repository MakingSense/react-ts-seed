import { ActionType } from './actions';
import { initialState, IState } from './state';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType, payload?: any }): IState => {
  switch (type) {
    case ActionType.FETCH_SUCCESS:
      return { ...state, todoMap: payload.todoList.reduce((total, curr) => ({ ...total, [curr.id]: curr }), state.todoMap) };
    default:
      return state;
  }
};
