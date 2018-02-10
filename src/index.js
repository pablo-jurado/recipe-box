// import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import appState from './state'
import _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';


// -------------------------------------------------
// Update State
// -------------------------------------------------

export function updateState(payload, action) {
  if (action === 'active') {
    _.forEach(appState.recipes, function(item) {
      item.active = (item.name === payload.name) ? true : false;
    });
  }
  if (action === 'close') {
    _.forEach(appState.recipes, function(item) {
      item.active = false;
    });
  }

  render(appState);
};
// -------------------------------------------------
// ReactDOM
// -------------------------------------------------
const root = document.getElementById("root");

function render(state) {
  ReactDOM.render(
    App(state),
    root
  );
};

// first render
updateState();

registerServiceWorker();
