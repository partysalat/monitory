import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';
import toastCss from 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Dashboard from '<%PATH_TO_DASHBOARD%>';
import getStore from './redux';

injectGlobal`
  ${styledNormalize}
  ${toastCss.toString()}
  body{
    font-family: 'Open Sans', sans-serif;
    background: #ccc;
  }
`;

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

