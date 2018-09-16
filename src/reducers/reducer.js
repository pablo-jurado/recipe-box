import {
  OPEN_EDITOR,
  CLOSE_EDITOR,
  ADD_RECIPE,
  TOGGLE_RECIPE,
  DELETE_RECIPE,
  UPDATE_RECIPE
} from "../actions";

const defaultState = {
  editor: false,
  editorRecipe: null,
  recipes: [
    {
      open: false,
      description: "adsf",
      id: "2f36de09-8d03-6452-af31-ccf49245",
      ingredients: "1, 2, 3",
      name: "pizza"
    },
    {
      open: false,
      description: "adsf",
      id: "2f36de09-8d03-6452-af31-ccf49246",
      ingredients: "1, 2, 3",
      name: "pasta"
    },
    {
      open: false,
      description: "adsf",
      id: "2f36de09-8d03-6452-af31-ccf49247",
      ingredients: "1, 2, 3",
      name: "Chicken parm"
    }
  ]
};

const rootReducer = (state = defaultState, action) => {
  if (action.type === OPEN_EDITOR) {
    return Object.assign({}, state, {
      editor: true,
      editorRecipe: action.payload
    });
  }

  if (action.type === CLOSE_EDITOR) {
    return Object.assign({}, state, { editor: false });
  }

  if (action.type === ADD_RECIPE) {
    let newState = Object.assign({}, state);
    newState.recipes.push(action.payload);
    return newState;
  }

  if (action.type === UPDATE_RECIPE) {
    const filterArray = state.recipes.map(recipe => {
      if (recipe.id === action.payload.id) {
        return action.payload;
      }
      return recipe;
    });
    return Object.assign({}, state, { recipes: filterArray });
  }

  if (action.type === TOGGLE_RECIPE) {
    const newRecipes = state.recipes.map(recipe => {
      if (recipe.id === action.payload) {
        recipe.open = !recipe.open;
      } else {
        recipe.open = false;
      }
      return recipe;
    });
    return Object.assign({}, state, { recipes: newRecipes });
  }

  if (action.type === DELETE_RECIPE) {
    const filterArray = state.recipes.filter(recipe => {
      return recipe.id !== action.payload;
    });
    return Object.assign({}, state, { recipes: filterArray });
  }

  return state;
};

export default rootReducer;

// localStorage.setItem("appState", JSON.stringify(appState));
// var appState = JSON.parse(localStorage.getItem("appState"));
