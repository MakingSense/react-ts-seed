import { initialState } from './state';
import { actions, ActionType } from './actions';
import { reducer } from './reducer';
import { epics } from './epics';

export { IState as IAuthState } from './state';
export const authState = { initialState, reducer, actions, ActionType, epics };
