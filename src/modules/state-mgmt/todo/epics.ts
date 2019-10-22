import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { IAction, IRootState, IEpicDependencies } from '../rootState';
import { actions, ActionType } from './actions';
import { coreState } from '../core';

export const fetchStart: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) =>
  action$.pipe(
    ofType(ActionType.FETCH_START),
    mergeMap(action =>
      of(action).pipe(
        mergeMap(() => deps.apiService.getTodoList()),
        map(res => actions.fetchSuccess(res)),
        catchError(error => of(coreState.actions.epicError(error)))
      )
    )
  );

export const epics = [fetchStart];
