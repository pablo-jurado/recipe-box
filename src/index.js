// import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import appState from './state';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import state from './state';

// -------------------------------------------------
// Update State
// -------------------------------------------------

export function updateState(payload, action) {
  if (action === 'active') {
    _.forEach(appState.recipes, function(item) {
      item.active = (item.name === payload.name);
    });
  }
  
  if (action === 'close') {
    _.forEach(appState.recipes, function(item) {
      item.active = false;
    });
  }

  if (action === 'open_editor') {
    appState.editor = true;
  }

  if (action === 'close_editor') {
    appState.editor = false;
  }

  render(appState);
};

// -------------------------------------------------
// ReactDOM
// -------------------------------------------------
const root = document.getElementById('root');

function render(state) {
  ReactDOM.render(
    App(state),
    root
  );
};

// first render
updateState();

registerServiceWorker();
