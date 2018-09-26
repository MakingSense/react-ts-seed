import { initialState } from './state';
import { actions, ActionType } from './actions';
import { reducer } from './reducer';
import { epics } from './epics';

export { IState as ITodoState } from './state';
export const todoState = { initialState, reducer, actions, ActionType, epics };
