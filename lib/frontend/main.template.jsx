import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';

import Dashboard from '<%PATH_TO_DASHBOARD%>';
import getStore from './redux';


injectGlobal`
  ${styledNormalize}
  
  body{}
`;

const rootElement = document.getElementById('root');
render(
  <Provider store={getStore()}>
    <Dashboard />
  </Provider>,
  rootElement,
);

