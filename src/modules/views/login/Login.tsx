import React, { memo, useCallback, useState } from 'react';
import { css } from 'aphrodite/no-important';

import styles from './styles';

export interface ILoginProps {
  login: (username: string, password: string) => void;
}

export interface ILoginState {
  username: string;
  password: string;
}

const Login = ({ login }: ILoginProps) => {
  const [state, setState] = useState<ILoginState>({ username: '', password: '' });

  const onLogin = useCallback(() => login(state.username, state.password), [state, login]);

  const setUsername = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setState({ ...state, username: event.target.value }), [state, setState]);

  const setPassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setState({ ...state, password: event.target.value }), [state, setState]);

  return (
    <div className={`${css(styles.loginContainer)} container`} key="Login">
      <form className={`${css(styles.loginForm)} form-group`}>
        <input
          className={`${css(styles.loginInput)} form-control`}
          data-testid="login-username"
          onChange={setUsername}
          value={state.username}
          placeholder="username"
          type="text"
          autoComplete="email"
        />
        <input
          className={`${css(styles.loginInput)} form-control`}
          onChange={setPassword}
          value={state.password}
          data-testid="login-password"
          placeholder="password"
          type="password"
          autoComplete="password"
        />
        <button data-testid="login-btn" className={`${css(styles.loginButton)} btn btn-primary`} onClick={onLogin} type="button">
          Login
        </button>
      </form>
    </div>
  );
};

export default memo(Login);
