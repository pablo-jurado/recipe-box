// import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import appState from './state';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';

// -------------------------------------------------
// Update State
// -------------------------------------------------

export function updateState(action, payload) {
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
    appState.editor.active = true;
  }

  if (action === 'close_editor') {
    appState.editor = {
      active: false,
      name: "",
      description: "",
      ingredient: "",
      allIngredients: []
    }
  }

  if (action === 'recipe_name') {
    appState.editor.name = payload;
  }

  if (action === 'recipe_description') {
    appState.editor.description = payload;
  }

  if (action === 'recipe_ingredient') {
    appState.editor.ingredient = payload;
  }

  if (action === 'add_ingredient') {
    var item = appState.editor.ingredient;
    appState.editor.ingredients.push(item);
    appState.editor.ingredient = "";
  }

  if (action === 'add_recipe') {
    appState.editor.active = false;
    appState.recipes.push(appState.editor);
    updateState('close_editor');
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
