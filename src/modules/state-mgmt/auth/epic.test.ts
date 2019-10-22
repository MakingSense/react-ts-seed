import { ActionsObservable } from 'redux-observable';

import { IEpicDependencies } from '../../state-mgmt/rootState';
import { authStart } from './epics';
import { actions } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import { getLoginResponse } from '../../../test/entities';
import { coreState } from '../core';
import { runEpic } from '../../../test/runEpic';

describe('auth epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps();
  });

  describe('authStart', () => {
    const username = 'username';
    const password = 'password';

    it('should get epic for auth start', () => {
      return runEpic(authStart(ActionsObservable.of(actions.start(username, password)), {} as any, deps), actionList => {
        expect(deps.apiService.login).toBeCalledWith({ username, password });
        expect(actionList[0]).toEqual(actions.success(getLoginResponse()));
      });
    });

    it('should catch errors', () => {
      deps.apiService.login = () => {
        throw error;
      };
      return runEpic(authStart(ActionsObservable.of(actions.start(username, password)), {} as any, deps), actionList => {
        expect(actionList[0]).toEqual(coreState.actions.epicError(error));
      });
    });
  });
});
