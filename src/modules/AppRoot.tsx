import * as React from 'react';

import logo from './../assets/logo.svg';

export default class App extends React.Component {
  public render() {
    return (
      <div>
        <img src={logo} alt="logo" />
        <p>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}
