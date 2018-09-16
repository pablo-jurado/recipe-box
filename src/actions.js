// actions
export const OPEN_EDITOR = "OPEN_EDITOR";
export const CLOSE_EDITOR = "CLOSE_EDITOR";
export const ADD_RECIPE = "ADD_RECIPE";
export const TOGGLE_RECIPE = "TOGGLE_RECIPE";
export const CLOSE_RECIPE = "CLOSE_RECIPE";
export const EDIT_RECIPE = "EDIT_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";

// action creators
export const closeEditor = () => {
  return {
    type: CLOSE_EDITOR
  };
};

export const openEditor = recipe => {
  return {
    type: OPEN_EDITOR,
    payload: recipe
  };
};

export const toggleRecipe = id => {
  return {
    type: TOGGLE_RECIPE,
    payload: id
  };
};

export const addRecipe = recipe => {
  return {
    type: ADD_RECIPE,
    payload: recipe
  };
};

export const deleteRecipe = id => {
  return {
    type: DELETE_RECIPE,
    payload: id
  };
};
