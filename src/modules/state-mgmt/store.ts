import { combineReducers, createStore, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { IRootState, IEpicDependencies, coreState, authState, todoState } from './rootState';
import { ApiService } from '../services/ApiService';
import { Logger } from '../services/Logger';

const history = createBrowserHistory();
const rootEpic = combineEpics<any>(...coreState.epics, ...authState.epics, ...todoState.epics);

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    history,
    apiService: new ApiService(),
    logger: Logger
  } as IEpicDependencies
});

const withDevtools = composeWithDevTools({ maxAge: 20, shouldCatchErrors: true });

const store: Store = createStore<IRootState, any, any, any>(
  connectRouter(history)(combineReducers({ auth: authState.reducer, todo: todoState.reducer })),
  withDevtools(applyMiddleware(routerMiddleware(history), epicMiddleware))
);

export { store, history };

epicMiddleware.run(rootEpic);
