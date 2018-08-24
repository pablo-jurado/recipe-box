import { OPEN_EDITOR, CLOSE_EDITOR, ADD_RECIPE } from "../actions";

const defaultState = {
  editor: false,
  recipes: []
};

const rootReducer = (state = defaultState, action) => {
  if (action.type === OPEN_EDITOR) {
    return Object.assign({}, state, { editor: true });
  }

  if (action.type === CLOSE_EDITOR) {
    return Object.assign({}, state, { editor: false });
  }

  if (action.type === ADD_RECIPE) {
    let newState = Object.assign({}, state);
    newState.recipes.push(action.payload);
    return newState;
  }

  return state;
};

export default rootReducer;

// localStorage.setItem("appState", JSON.stringify(appState));
// var appState = JSON.parse(localStorage.getItem("appState"));
