import { OPEN_EDITOR, CLOSE_EDITOR } from "../actions";

const defaultState = {
  editor: true,
  recipes: {}
};

const rootReducer = (state = defaultState, action) => {
  if (action.type === OPEN_EDITOR) {
    let newState = Object.assign({}, state);
    newState.editor = true;
    return newState;
  }

  if (action.type === CLOSE_EDITOR) {
    let newState = Object.assign({}, state);
    newState.editor = false;
    return newState;
  }
  return state;
};

export default rootReducer;

// localStorage.setItem("appState", JSON.stringify(appState));
// var appState = JSON.parse(localStorage.getItem("appState"));
