import { ActionsObservable } from 'redux-observable';

import { IEpicDependencies } from '../../state-mgmt/rootState';
import { fetchStart } from './epics';
import { actions } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import { getTodo_1 } from '../../../test/entities';
import { coreState } from '../core';
import { runEpic } from '../../../test/runEpic';

describe('todo epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps();
  });

  describe('authStart', () => {
    it('should get epic for auth start', () => {
      return runEpic(fetchStart(ActionsObservable.of(actions.fetchStart()), {} as any, deps), actionList => {
        expect(deps.apiService.getTodoList).toBeCalled();
        expect(actionList[0]).toEqual(actions.fetchSuccess([getTodo_1()]));
      });
    });

    it('should catch errors', () => {
      deps.apiService.getTodoList = () => {
        throw error;
      };
      return runEpic(fetchStart(ActionsObservable.of(actions.fetchStart()), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(coreState.actions.epicError(error));
      });
    });
  });
});
