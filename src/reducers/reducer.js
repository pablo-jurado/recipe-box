import {
  OPEN_EDITOR,
  CLOSE_EDITOR,
  ADD_RECIPE,
  TOGGLE_RECIPE
} from "../actions";

const defaultState = {
  editor: false,
  recipes: [
    {
      active: false,
      description: "adsf",
      id: "2f36de09-8d03-6452-af31-ccf49245",
      ingredients: "1, 2, 3",
      name: "pizza"
    },
    {
      active: false,
      description: "adsf",
      id: "2f36de09-8d03-6452-af31-ccf49246",
      ingredients: "1, 2, 3",
      name: "pasta"
    },
    {
      active: false,
      description: "adsf",
      id: "2f36de09-8d03-6452-af31-ccf49247",
      ingredients: "1, 2, 3",
      name: "Chicken parm"
    }
  ]
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

  if (action.type === TOGGLE_RECIPE) {
    const newRecipes = state.recipes.map(recipe => {
      if (recipe.id === action.id) {
        recipe.active = !recipe.active;
      } else {
        recipe.active = false;
      }
      return recipe;
    });
    return Object.assign({}, state, { recipes: newRecipes });
  }

  return state;
};

export default rootReducer;

// localStorage.setItem("appState", JSON.stringify(appState));
// var appState = JSON.parse(localStorage.getItem("appState"));
