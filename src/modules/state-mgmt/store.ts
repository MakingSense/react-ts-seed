import { combineReducers, createStore, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import { IRootState, IEpicDependencies, authState, coreState } from './rootState';
import { ApiService } from '../services/ApiService';
import { Logger } from '../services/Logger';

const rootEpic = combineEpics<any>(...authState.epics, ...coreState.epics);

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    apiService: new ApiService(),
    logger: Logger
  } as IEpicDependencies
});

const withDevtools = composeWithDevTools({ maxAge: 20, shouldCatchErrors: true });

const store: Store = createStore<IRootState, any, any, any>(
  combineReducers({ auth: authState.reducer } as any), withDevtools(applyMiddleware(epicMiddleware))
);

export { store };

epicMiddleware.run(rootEpic);
