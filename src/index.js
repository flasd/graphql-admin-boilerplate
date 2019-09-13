import React from 'react';
import ReactDOM from 'react-dom';
import { setLocalStorageKey } from 'fetch-auth-manager';
import ptBR from 'antd/es/locale/pt_BR';
import filterConsole from 'filter-console';
import App from './App';
import * as serviceWorker from './serviceWorker';
import history from './services/history';
import { getClient } from './services/apollo';

import 'nanoreset';
import '@flasd/focus-fix';
import '@flasd/focus-fix/styles.css';
import 'view-units';

setLocalStorageKey('b7181ffb6932f718c818b7f8a55d66a0227ac293');

ReactDOM.render(
  React.createElement(App, {
    locale: ptBR,
    history,
    getClient,
  }),
  document.getElementById('root'),
);

if (process.env.NODE_ENV === 'development') {
  // Ant uses those functions internally and the warnings are annoying
  filterConsole([
    'Warning: componentWillMount',
    'Warning: componentWillReceiveProps',
  ]);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
