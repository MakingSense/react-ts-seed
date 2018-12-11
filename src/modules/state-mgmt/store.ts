import { combineReducers, createStore, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { ReducerRegistry } from './ReducerRegistry';
import { EpicRegistry } from './EpicRegistry';
import { IRootState, IEpicDependencies } from './rootState';
import { ApiService } from '../services/ApiService';
import { Logger } from '../services/Logger';

const history = createBrowserHistory();

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    history,
    apiService: new ApiService(),
    logger: Logger
  } as IEpicDependencies
});

const withDevtools = composeWithDevTools({ maxAge: 20, shouldCatchErrors: true });

const store: Store = createStore<IRootState, any, any, any>(
  connectRouter(history)(combineReducers(ReducerRegistry.getReducers())),
  {},
  withDevtools(applyMiddleware(routerMiddleware(history), epicMiddleware))
);

ReducerRegistry.setChangeListener(reducers => store.replaceReducer(connectRouter(history)(combineReducers(reducers))));

export { store, history };

epicMiddleware.run(EpicRegistry.rootEpic);
