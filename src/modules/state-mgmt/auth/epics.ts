import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';

import { IAction, IRootState, IEpicDependencies } from '../rootState';
import { actions, ActionType } from './actions';
import { coreState } from '../core';

export const authStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.START),
    mergeMap(action =>
      of(action).pipe(
        mergeMap(({ payload }) => deps.apiService.login(payload)),
        map(res => actions.success(res)),
        tap(() => deps.history.push('/todo-list')),
        catchError(error => of(coreState.actions.epicError(error)))
      )
    )
  );

export const epics = [authStart];
