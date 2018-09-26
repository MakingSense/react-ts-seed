import { ActionType } from './actions';
import { initialState, IState } from './state';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType, payload: any }): IState => {
  switch (type) {
    case ActionType.SUCCESS:
      return { ...state, currentUserId: payload.loginResponse.id };
    default:
      return state;
  }
};
