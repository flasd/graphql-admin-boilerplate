import React from 'react';
import ReactDOM from 'react-dom';
import { setLocalStorageKey } from 'fetch-auth-manager';
import ptBR from 'antd/es/locale/pt_BR';
import App from './App';
import * as serviceWorker from './serviceWorker';
import history from './services/history';
import { getClient } from './services/apollo';

import 'nanoreset';
import '@flasd/focus-fix';
import '@flasd/focus-fix/styles.css';

setLocalStorageKey('b7181ffb6932f718c818b7f8a55d66a0227ac293');

ReactDOM.render(
  React.createElement(App, {
    locale: ptBR,
    history,
    getClient,
  }),
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
