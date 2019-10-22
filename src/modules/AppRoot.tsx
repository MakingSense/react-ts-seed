import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';

import { store, history } from './state-mgmt/store';

const Login = lazy(() => import('./views/Login'));
const TodoList = lazy(() => import('./views/TodoList'));

export default class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              exact={true}
              path="/"
              render={() => (
                <Suspense fallback={<p>loading</p>}>
                  <Login />
                </Suspense>
              )}
            />
            <Route
              exact={true}
              path="/todo-list"
              render={() => (
                <Suspense fallback={<p>loading</p>}>
                  <TodoList />
                </Suspense>
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
