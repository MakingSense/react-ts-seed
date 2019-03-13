# React Typescript Seed

#### This project uses:
* React `for rendering views`
* Redux `for state managment`
* Redux Observable / Rxjs `for side effecst and data flows`
* Storybook `to create component's stories`

### Standards
- Git Flow, please read [git-workflow](https://github.com/MakingSense/development-guidelines/blob/master/git-workflow/README.md).
- Code reviews template. This is a standard format:

If any field below is not needed, keep the title and use N/A as message body.
```
## Background
_(Explain what was the problem, what decisions you took to solve them.)_
## Changes done
_(Enumerate changes done, that are not obvious from the contents of the code. Explain only general approaches to the changes. Explain design decisions if any.)_
## Pending to be done
_(Enumerate known pending tasks and why they weren't addressed here.)_
## Notes
_(Optional. Any additional notes that will help reviewers understand the PR.)_
```

## Commands
* **installation:** `yarn install`
* **develop:** `yarn start:dev` *starts the app on development mode*
* **test e2e:** `yarn e2e` *run e2e tests*
* **test:** `yarn test` *unit tests*
* **test:** `yarn test -u` *unit tests with snapshots update. Make sure you really need to update the snapshots by checking the error messages thoroughly*
* **build:** `yarn e2e` *production build*
* **storybook:** `yarn storybook` *launch storybook server to browse stories*


## Scaffolding
* src (folder) `source code`
* * assets (folder) `media assets`
* * config (folder) `environment config files`
* * constants (folder) `app constants`
* * modules (folder) `main app modules`
* * * models (folder) `entity models, typeguards, interfaces, enums, and other ts related files`
* * * services (folder) `services that will be injected as dependencies to be used on epics`
* * * state-mgmt (folder) `state management files grouped by entity and store creation`
* * * views (folder) `react components grouped by page and shared folder including cross app components`
* * stories (folder) `react storybook stories`
* * test (folder) `testing helpers and mocks`
* * types (folder) `general types that doesn't feet any model. This is rarely used`
* * utils (folder) `utilities`

## Code Examples

### Models
* Definition files for interfaces
* Static typing advantages

```typescript
export enum Status {
  ONLINE = 'online',
  OFFLINE = 'offline'
}

/** this is how all user objects should look */
export interface IUser {
  id?: string; // optional id field, because it's not there on entity creation
  email: string;
  name: string;
  status: Status;
}
```

### Services
* Classes to help on epics *(rxjs side effects)* to achieve several things as http requests, access to the logger, etc.
* They can be static or not depending on the needs, they are injected (instantiated) on the store file `state-mgmt/store.ts` *(code example is shown later on this file)*

```typescript
/** Logger */
import { ENV } from '../../constants';
import { EventTracker } from './EventTracker';

export abstract class Logger {
  private static shouldLog = !ENV.IS_TEST;
  private static printer = console;

  public static log = (...args) => Logger.logMethod('log', ...args);
  public static info = (...args) => Logger.logMethod('info', ...args);
  public static warn = (...args) => Logger.logMethod('warn', ...args);
  public static error = (...args) => Logger.logMethod('error', ...args);
  public static table = (...args) => Logger.logMethod('table', ...args);

  private static logMethod = (level, ...args) => {
    EventTracker[EventTracker[level] ? level : 'debug'](...args);
    if (!Logger.shouldLog) return;
    Logger.printer[level](...args);
  }

}
```

### State-mgmt
* It groups all redux files in the app by entity
* It uses *redux-observable* middleware to emit *actions* into *rxjs observables* called `epics` which *emites actions* in return
* The side effect flow looks like this:
* * action `GET_USER_START` was `dispatched` into the *redux store*
* * an epic received that action as an observable emition > then called the server > then emited a new action `GET_USER_SUCCESS` which will be `dispatched` into the *redux store*
* * a `reducer` with a *switch case* for `GET_USER_SUCCESS` adds the user to the user's state

#### actions 
* Actions are payloads of information that send data from the application to the store
```typescript

/** Action types constants */
export enum ActionType {
  GET_START = '[user] get start',
  GET_SUCCESS = '[user] get success'
}
/** action creators */
export const actions = {
  getStart: (userId: string) => ({ type: ActionType.GET_START, payload: { userId } }),
  getSuccess: (user: UserModel.IUser) => ({ type: ActionType.GET_SUCCESS, payload: { user } })
};
```

#### epic
* Function that returns an rxjs observable that expects to receive an action and emits n actions
* * action$ `is an observable that emits redux actions`
* * state$ `is an observable containing the current redux state. It is usually accesed like this: state$.value.auth.currentUserId`

```typescript
export const userGetEpicGetUserList: Epic<IAction, IAction, IRootState, IEpicDependencies> = (action$, state$, deps) => // returns an observable
  action$.pipe( // pipes the action observable to change the flow
    ofType(ActionType.SET_LIST_START), // filter to get only ActionType.SET_LIST_START emitions
    mergeMap(action => of(null).pipe( // mergeMap to a new observable pipe in case it throws an error and completes, the next SET_LIST_START will still be listened to
      mergeMap(({ payload }) => deps.apiService.getUserList(payload.idList)), // merges with the apiService observable
      map(res => actions.setListSuccess(res.docs)), // maps the server's response into an action object { type: 'action type string' payload: { user: <user data> } }
      catchError(error => of(coreState.actions.epicError(error))) // catches error, completes this pipe and emits an action object { type: 'error type', payload: <error payload> } as the final value
    ))
  );

```

#### reducer
* straightforward redux reducer
* we use maps instead of lists so we avoid looping, repeated values, select easly, check for thruthy values, compose with other states, etc.

```typescript
import { IState, initialState } from './state';
import { ActionType } from './actions';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType, payload: any }): IState => { // this return type helps writing reducers using standard ts advantages
  switch (type) {
    case ActionType.SET_LIST_SUCCESS:
      return { ...state, userMap: payload.userList.reduce((total, item) => ({ ...total, [item._id]: item }), state.userMap) };
    case ActionType.SET_SUCCESS:
      return { ...state, userMap: { ...state.userMap, [payload.user._id]: payload.user } };
    default:
      return state;
  }
};

```

#### store
* Standard redux store with the added responsibility of creating the provider for the dependency injection on epics

```typescript
import { combineReducers, createStore, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ApiService } from '../services/ApiService';
import { Logger } from '../services/Logger';
import { IRootState, IEpicDependencies, authState, userState, coreState } from './rootState';

/** combining epics (observable getters) to use as middeware */
const rootEpic = combineEpics<any>(...authState.epics, ...coreState.epics, ...userState.epics);

/** provides for DI */
const epicMiddleware = createEpicMiddleware({
  dependencies: {
    apiService: new ApiService(),
    logger: Logger
  } as IEpicDependencies
});

const withDevtools = composeWithDevTools({ maxAge: 20, shouldCatchErrors: true });

const store: Store = createStore<IRootState, any, any, any>(
  combineReducers({ auth: authState.reducer, user: userState.reducer } as any), withDevtools(applyMiddleware(epicMiddleware))
);

export { store };

epicMiddleware.run(rootEpic); // starts epic middleware so it subscribes to actions being dispatched

```

### views
* Composed of components and containers to render views

#### containers
* containers are the connection between redux (state and action dispatchers)
* they handle the selection and composition of data needed to render
* the DO NOT contain tsx/jsx or other react code

```typescript
import { connect } from 'react-redux';

import { MessageModel } from '../../models';
import { IRootState, messageState } from '../../state-mgmt/rootState';
import Communication from './Communication';

export const mapStateToProps = (state: IRootState) => ({
  messageMap: state.message.messageMap, // straightforward selection
  currentUser: state.user.userMap[state.auth.currentUserId] // composition using user and auth states
});

export const mapDispatchToProps = dispatch => ({
  sendMessage: (message: MessageModel.IMessage) => dispatch(messageState.actions.setStart(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Communication);

```

#### components
* React components, mostly presentational with little to no business logic
* Components try to be as *dumb* as possible, delegating all complex tasks to:
* * epics `through containers to fetch, create data or other flows`
* * helpers/utils `for agnostic logic like parsing, formatting, calculating, etc`
* * child components `for reusable renders, branching or other render related tasks`

```typescript
import React from 'react';

import styles from './styles';

export interface ILoginProps {
  login: (username: string, password: string) => void;
}

export interface ILoginState {
  username: string;
  password: string;
}

export default class Login extends React.PureComponent<ILoginProps, ILoginState> {
  public state: ILoginState = { username: '', password: '' };

  public login = () => {
    const { login } = this.props;
    const { username, password } = this.state;
    login(username, password);
  }

  public setUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  }
  public setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  }

  public render() {
    const { username, password } = this.state;
    return (
      <div style={styles.loginContainer}>
        <form style={styles.loginForm}>
          <input style={styles.loginInput} onChange={this.setUsername} value={username} placeholder="username" type="text" />
          <input style={styles.loginInput} onChange={this.setPassword} value={password} placeholder="password" type="password" />
          <button style={styles.loginButton} onClick={this.login} type="button">Login</button>
        </form>
      </div>
    );
  }
}
```

### test
* tests aim to achieve 100% coverage and have examples for each test scenario that might occur

#### Service

```typescript
import { Logger } from './Logger';

describe('Logger', () => {
  beforeEach(() => {
    (Logger as any).printer = { log: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn(), table: jest.fn() };
  });

  it('should log with all logging methods', () => {
    const data = 'well hello..';
    Logger.log(data);
    expect((Logger as any).printer.log).toHaveBeenCalledWith(data);
    Logger.info(data);
    expect((Logger as any).printer.info).toHaveBeenCalledWith(data);
    Logger.warn(data);
    expect((Logger as any).printer.warn).toHaveBeenCalledWith(data);
    Logger.error(data);
    expect((Logger as any).printer.warn).toHaveBeenCalledWith(data);
    Logger.table(data);
    expect((Logger as any).printer.table).toHaveBeenCalledWith(data);
  });
});
```

#### Epic

```typescript
describe('auth epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps(); // fresh dependency mocks from the test helpers
  });

  describe('authGetEpicAuthStart', () => {
    const email = 'email';
    const password = 'password';

    it('should get epic for auth start', done => {
      const emitedActions = [];
      const loginResponse = getLoginResponse();
      const action$ = ActionsObservable.of(actions.start(email, password));
      authGetEpicAuthStart(action$, {/** if we need a mock state, this is the place to put it */} as any, deps).subscribe(output => {
        emitedActions.push(output); // we save each emision here
        if (output.type === ActionType.SET_LOADING && output.payload.isLoading === false) { // we chouse on which emision to stop and test
          expect(deps.apiService.login).toBeCalledWith({ email, password });
          expect(deps.asyncStorageService.setItem).toBeCalledWith(ENV.STORAGE_KEY.AUTH, { userId: loginResponse._id });
          expect(emitedActions[0]).toEqual(actions.setLoading(true));
          expect(emitedActions[1]).toEqual(actions.success(loginResponse._id, loginResponse.notificationChannel, loginResponse.defaultChannelId));
          expect(emitedActions[2]).toEqual(coreState.actions.bootstrap(loginResponse.access_token));
          expect(emitedActions[3]).toEqual(actions.setLoading(false));
          done();
        }
      });
    });

    /** we also test the catchError branch */
    it('should catch errors and dispatch them to the auth error handler', done => {
      const emitedActions = [];
      deps.apiService.login = () => { throw error; };
      authGetEpicAuthStart(ActionsObservable.of(actions.start(email, password)), {} as any, deps).subscribe(output => {
        emitedActions.push(output);
        if (output.type === ActionType.SET_LOADING && output.payload.isLoading === false) {
          expect(emitedActions[0]).toEqual(actions.setLoading(true));
          expect(emitedActions[1]).toEqual(actions.fail());
          expect(emitedActions[2]).toEqual(actions.setLoading(false));
          done();
        }
      });
    });
  });
});
```

#### Reducer

```typescript
import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import { getUser_1 } from '../../../test/entities';

describe('user reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should return a new state ActionType.SET_LIST_SUCCESS', () => {
    const user = getUser_1();
    expect(reducer(undefined, actions.setListSuccess([user]))).toEqual({ ...initialState, userMap: { [user._id]: user } });
  });

  it('should return a new state ActionType.SET_SUCCESS', () => {
    const user = getUser_1();
    expect(reducer(undefined, actions.setSuccess(user))).toEqual({ ...initialState, userMap: { [user._id]: user } });
  });
});
```

#### Container:

```typescript
/** START the container looks like this */
import { connect } from 'react-redux';

import { IRootState, channelState } from '../../state-mgmt/rootState';
import About from './About';

export const mapStateToProps = (state: IRootState) => ({
  defaultChannelId: state.auth.defaultChannelId
});

export const mapDispatchToProps = dispatch => ({
  openChannel: (channelId: string) => dispatch(channelState.actions.openChannel(channelId))
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
/** END the container looks like this */

import { mapStateToProps, mapDispatchToProps } from './AboutContainer';
import { IRootState, channelState } from '../../state-mgmt/rootState';
import { getState } from '../../../test/entities'; // mock state generated with mock entities

describe('AboutContainer', () => {
  let state: IRootState;
  beforeEach(() => {
    state = getState();
  });

  /** testing the state is maping the correct data to prop */
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps(state)).toEqual({
      defaultChannelId: state.auth.defaultChannelId
    });
  });

  /** testing that props that contain dispach functions are there */
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      openChannel: expect.any(Function)
    });
  });

  /** testing that the correct actions are being dispatched */
  it('should openChannel', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.openChannel(state.auth.defaultChannelId);
    expect(dispatch).toBeCalledWith(channelState.actions.openChannel(state.auth.defaultChannelId));
  });
});

```

#### Component
* for most of component testing, we are using snapshots
* a snapshot is created for each version of the render so we cover all branches

```typescript
import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';

import Login from './Login';

describe('Login Component', () => {
  let Component;
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      login: jest.fn()
    };
    Component = shallow(<Login {...defaultProps} />);
  });

  describe('render', () => {
    /** if we had more branches... like a render with and without error messages, we would have another snapshot */
    it('should render with default props', () => {
      expect(create(Component).toJSON()).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should set username and password and login', () => {
      const username = 'username';
      const password = 'password';
      Component.find('input[type="text"]').simulate('change', { target: { value: username } });
      Component.find('input[type="password"]').simulate('change', { target: { value: password } });
      expect(Component.instance().state).toEqual({ username, password });
      Component.find('button').simulate('click');
      expect(defaultProps.login).toBeCalledWith(username, password);
    });
  });
});
```

### Stories
Any component can have a *story* inside the `src/stories` folder. The `src/stories` folder must only consists of 
`[Component-Name].story.tsx` files (the `.story.tsx` extension is mandatory).

**IMPORTANT:** If you want to take advantage of the self-documenting feature using prop and state interfaces, please
extend the react component from `PureComponent` instead of `React.PureComponent`

```typescript jsx
  import React from 'react';
  
  import { storiesOf } from '@storybook/react';
  
  import TodoList from '../modules/views/todo-list/TodoList';
  import { getTodo_1 } from '../test/entities';
    
  const todoMap = { [getTodo_1().id]: getTodo_1() };
    
  storiesOf('TodoList', module)
    .add('with todoMap', () => (
      <TodoList todoMap={todoMap} fetchTodoList={() => {/** */}} />
  ));
```

#### This section contains a guide of what we use to generate the react native application

* This project includes the following features:
- [React Native](https://facebook.github.io/react-native/) mobile apps using TypeScript and React
* * [expo](https://expo.io/) `build cross-platform native apps`
* * [redux](https://github.com/reduxjs/redux) `predictable state container for JavaScript apps`
* * [rxjs](https://rxjs-dev.firebaseapp.com/) `reactive programming using Observables, to make it easier to compose asynchronous or callback-based code`
* * [rollbar](https://github.com/marketplace/rollbar) `real-time error alerting & debugging`
* * [jest](https://www.npmjs.com/package/jest) `unit testing`
