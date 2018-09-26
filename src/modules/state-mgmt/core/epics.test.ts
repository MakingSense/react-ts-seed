import { ActionsObservable } from 'redux-observable';

import { IEpicDependencies } from '../../state-mgmt/rootState';
import { coreGetEpicErrorHandler } from './epics';
import { actions } from './actions';
import { getDeps } from '../../../test/epicDependencies';

describe('auth epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps();
  });

  describe('coreGetEpicErrorHandler', () => {
    it('should dispatch no actions', done => {
      coreGetEpicErrorHandler(ActionsObservable.of(actions.epicError(error)), {} as any, deps).subscribe(() => {
        expect(false).toBe(true);
        done();
      });
      setTimeout(() => {
        expect(deps.logger.error).toBeCalledWith(error);
        done();
      }, 10);
    });
  });
});
