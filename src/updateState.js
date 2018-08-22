import appState from "./state";
import { render } from "./index";
import _ from "lodash";

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
}

// -------------------------------------------------
// Update State
// -------------------------------------------------

function updateState(action, payload) {
  if (action === "tab_active") {
    _.forEach(appState.recipes, function(item) {
      item.active = item.id === payload.id;
    });
  }

  if (action === "tab_close") {
    _.forEach(appState.recipes, function(item) {
      item.active = false;
    });
  }

  if (action === "open_editor") {
    appState.editor.active = true;
  }

  if (action === "close_editor") {
    appState.editor = {
      id: null,
      active: false,
      name: "",
      description: "",
      ingredients: ""
    };
  }

  if (action === "update_name") {
    appState.editor.name = payload;
  }

  if (action === "update_description") {
    appState.editor.description = payload;
  }

  if (action === "update_ingredients") {
    appState.editor.ingredients = payload;
  }

  if (action === "save_recipe") {
    appState.editor.active = false;
    // update if already exist
    if (appState.editor.id in appState.recipes) {
      appState.recipes[appState.editor.id] = appState.editor;
    } else {
      // if does not exist will create a new one
      var id = guid();
      appState.editor.id = id;
      appState.recipes[id] = appState.editor;
    }
    updateState("close_editor");
  }

  if (action === "delete_recipe") {
    delete appState.recipes[payload.id];
  }

  if (action === "edit_recipe") {
    appState.editor = _.cloneDeep(payload);
    appState.editor.active = true;
  }

  localStorage.setItem("appState", JSON.stringify(appState));

  render(appState);
}

export default updateState;
