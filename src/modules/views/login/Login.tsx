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
  public state: ILoginState = {
    username: '',
    password: ''
  };

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
      <div style={styles.loginContainer} className="container" key="Login">
        <form style={styles.loginForm} className="form-group">
          <input style={styles.loginInput} className="form-control" onChange={this.setUsername} value={username} placeholder="username" type="text" />
          <input style={styles.loginInput} className="form-control" onChange={this.setPassword} value={password} placeholder="password" type="password" />
          <button style={styles.loginButton} className="btn btn-primary" onClick={this.login} type="button">Login</button>
        </form>
      </div>
    );
  }
}
