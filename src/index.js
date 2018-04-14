import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';

// -------------------------------------------------
// ReactDOM
// -------------------------------------------------
const root = document.getElementById('root');

ReactDOM.render(
  <App />,
  root
);

registerServiceWorker();
