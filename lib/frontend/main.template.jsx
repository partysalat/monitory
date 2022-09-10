import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import normalizeCss from 'normalize.css/normalize.css';
import { css, createGlobalStyle } from 'styled-components';
import toastCss from 'react-toastify/dist/ReactToastify.css';
import chartistCss from 'chartist/dist/chartist.min.css';
import { ToastContainer } from 'react-toastify';
import Dashboard from '<%PATH_TO_DASHBOARD%>'; // eslint-disable-line
import getStore from '<%PATH_TO_REDUX%>';

const GlobalStyle = createGlobalStyle`
  ${css`${normalizeCss}`}
  ${toastCss}
  ${css`${chartistCss}`}
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
      <GlobalStyle />
    </div>
  </Provider>,
  rootElement,
);
