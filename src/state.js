var appState = JSON.parse(localStorage.getItem("appState"));

if (!appState) {
  var defaultState = {
    editor: {
      id: null,
      edit: false,
      active: false,
      name: "",
      description: "",
      ingredient: "",
      ingredients: []
    },
    recipes: {}
  };

  localStorage.setItem("appState", JSON.stringify(defaultState));
  appState = defaultState;
}

export default appState;
