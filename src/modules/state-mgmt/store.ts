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

const withDevtools = composeWithDevTools({ maxAge: 20, shouldCatchErrors: true, trace: true });

const store: Store = createStore<IRootState, any, any, any>(
  combineReducers({ ...ReducerRegistry.getReducers(), router: connectRouter(history) }),
  {},
  withDevtools(applyMiddleware(routerMiddleware(history), epicMiddleware))
);

ReducerRegistry.setChangeListener(reducers => store.replaceReducer(combineReducers({ ...reducers, router: connectRouter(history) })));

export { store, history };

epicMiddleware.run(EpicRegistry.rootEpic);
