import { Epic, ofType } from 'redux-observable';
import { of, empty } from 'rxjs';
import { tap, mergeMap, switchMap } from 'rxjs/operators';

import { IAction, IRootState, IEpicDependencies } from '../rootState';
import { ActionType } from './actions';

export const handleErrors: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.EPIC_ERROR),
    mergeMap(action =>
      of(action).pipe(
        tap(({ payload }) => deps.logger.error(payload.error)),
        switchMap(() => empty())
      )
    )
  );

export const epics = [handleErrors];
