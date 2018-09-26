import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import LazyRoute from 'react-lazy-route';

import { store, history } from './state-mgmt/store';

const Login = () => import('./views/login');
const TodoList = () => import('./views/todo-list');

export default class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <LazyRoute exact={true} path="/" render={Login} />
            <LazyRoute exact={true} path="/todo-list" render={TodoList} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
