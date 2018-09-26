import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import { getTodo_1 } from '../../../test/entities';

describe('auth reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should return a new state on auth ActionType.SUCCESS', () => {
    const todoList = [getTodo_1()];
    expect(reducer(undefined, actions.fetchSuccess(todoList))).toEqual({ ...initialState, todoMap: { [getTodo_1().id]: getTodo_1() } });
  });
});
