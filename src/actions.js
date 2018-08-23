// actions
export const OPEN_EDITOR = "OPEN_EDITOR";
export const CLOSE_EDITOR = "CLOSE_EDITOR";
export const ADD_RECIPE = "ADD_RECIPE";
export const OPEN_RECIPE = "OPEN_RECIPE";
export const CLOSE_RECIPE = "CLOSE_RECIPE";
export const EDIT_RECIPE = "EDIT_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";

// action creators
export const closeEditor = () => {
  return {
    type: CLOSE_EDITOR
  };
};

export const openEditor = () => {
  return {
    type: OPEN_EDITOR
  };
};
