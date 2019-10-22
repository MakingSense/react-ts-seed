import { ActionsObservable } from 'redux-observable';

import { IEpicDependencies } from '../../state-mgmt/rootState';
import { handleErrors } from './epics';
import { actions } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import { runEpic } from '../../../test/runEpic';

describe('auth epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps();
  });

  describe('handleErrors', () => {
    it('should dispatch no actions', () => {
      return runEpic(
        handleErrors(ActionsObservable.of(actions.epicError(error)), {} as any, deps),
        actionList => {
          expect(actionList).toHaveLength(0);
        },
        10
      );
    });
  });
});
