// import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import appState from './state';
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
// Update State
// -------------------------------------------------

export function updateState(action, payload) {
  if (action === 'active') {
    _.forEach(appState.recipes, function(item) {
      item.active = (item.id === payload.id);
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
      id: null,
      active: false,
      name: "",
      description: "",
      ingredient: "",
      ingredients: []
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

  if (action === 'save_recipe') {
    var id = guid();

    appState.editor.active = false;
    appState.editor.id = id
    appState.recipes[id] = appState.editor;

    updateState('close_editor');
  }

  if (action === 'edit_recipe') {
    appState.editor = payload
    updateState('open_editor');
  }

  if (action === 'delete' ) {
    delete appState.recipes[payload.id];
  }

  localStorage.setItem("appState", JSON.stringify(appState));

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
