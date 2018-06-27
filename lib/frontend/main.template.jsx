import React from 'react';
import { render } from 'react-dom';

import Dashboard from '<%PATH_TO_DASHBOARD%>';
// import './main.scss';


const rootElement = document.getElementById('root');
render(
  <Dashboard />,
  rootElement,
);

