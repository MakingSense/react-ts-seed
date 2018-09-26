import { ActionsObservable } from 'redux-observable';

import { IEpicDependencies } from '../../state-mgmt/rootState';
import { authGetEpicAuthStart } from './epics';
import { actions } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import { getLoginResponse } from '../../../test/entities';
import { coreState } from '../core';

describe('auth epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps();
  });

  describe('authGetEpicAuthStart', () => {

    const username = 'username';
    const password = 'password';

    it('should get epic for auth start', done => {
      authGetEpicAuthStart(ActionsObservable.of(actions.start(username, password)), {} as any, deps).subscribe(output => {
        expect(deps.apiService.login).toBeCalledWith({ username, password });
        expect(output).toEqual(actions.success(getLoginResponse()));
        done();
      });
    });

    it('should catch errors and dispatch them to the general error handler', done => {
      deps.apiService.login = () => { throw error; };
      authGetEpicAuthStart(ActionsObservable.of(actions.start(username, password)), {} as any, deps).subscribe(output => {
        expect(output).toEqual(coreState.actions.epicError(error));
        done();
      });
    });
  });

});
