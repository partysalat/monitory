import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Dashboard from '<%PATH_TO_DASHBOARD%>';
// import './main.scss';
import getStore from './redux';

const rootElement = document.getElementById('root');
render(
  <Provider store={getStore()}>
    <Dashboard />
  </Provider>,
  rootElement,
);

