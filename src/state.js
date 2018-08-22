/* global localStorage */

var appState = JSON.parse(localStorage.getItem("appState"));

if (!appState) {
  var defaultState = {
    isEditorOpen: false,
    recipes: {}
  };

  localStorage.setItem("appState", JSON.stringify(defaultState));
  appState = defaultState;
}

export default appState;
