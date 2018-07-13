import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';
import toastCss from 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Dashboard from '<%PATH_TO_DASHBOARD%>'; // eslint-disable-line
import getStore from './redux';

/* eslint-disable */
injectGlobal`
  ${styledNormalize}
  ${toastCss.toString()}
  body{
    font-family: 'Open Sans', sans-serif;
    background: #ccc;
  }
`;
/* eslint-enable */
const rootElement = document.getElementById('root');
render(
  <Provider store={getStore()}>
    <div>
      <Dashboard />
      <ToastContainer />
    </div>
  </Provider>,
  rootElement,
);

