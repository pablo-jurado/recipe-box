// import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import appState from './state'
import registerServiceWorker from './registerServiceWorker';


// -------------------------------------------------
// Update State
// -------------------------------------------------

export function updateState(payload, action) {
  if (action === 'active') {
    appState.recipes.forEach(function(recipe) {
      if (recipe.name === payload.name) {
        recipe.active = true;
      } else {
        recipe.active = false;
      }
    });
  } else if (action === 'close') {
    appState.recipes.forEach(function(recipe) {
      if (recipe.name === payload.name) {
        recipe.active = false;
      }
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
