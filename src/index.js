import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// -------------------------------------------------
// ReactDOM
// -------------------------------------------------
const root = document.getElementById('root');

ReactDOM.render(
  <App />,
  root
);

registerServiceWorker();
