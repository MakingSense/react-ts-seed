import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppRoot from './modules/AppRoot';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <AppRoot />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
