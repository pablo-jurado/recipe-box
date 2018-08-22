/* global localStorage */

const OPEN_EDITOR = "OPEN_EDITOR";
const CLOSE_EDITOR = "CLOSE_EDITOR";
const ADD_RECIPE = "ADD_RECIPE";
const OPEN_RECIPE = "OPEN_RECIPE";
const CLOSE_RECIPE = "CLOSE_RECIPE";
const EDIT_RECIPE = "EDIT_RECIPE";
const DELETE_RECIPE = "DELETE_RECIPE";

function saveState(appState) {
  localStorage.setItem("appState", JSON.stringify(appState));
}
