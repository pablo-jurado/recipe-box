import React from "react";

function updateState(x, y) {
  console.log(x, y);
}

function Recipe(item) {
  if (item.active) {
    return RecipeOpened(item);
  } else {
    return RecipeClosed(item);
  }
}

function RecipeOpened(recipe) {
  var ingredientsArr = recipe.ingredients
    .trim()
    .split(",")
    .filter(item => item !== "");
  var ingredients = ingredientsArr.map((item, idx) => (
    <li key={idx}> {item}</li>
  ));
  return (
    <div className="card" key={recipe.id}>
      <div
        className="card-header"
        onClick={() => updateState("tab_close", recipe)}
      >
        {recipe.name}
      </div>
      <div className="card-body">
        <p className="card-text">{recipe.description}</p>
        <p>
          <strong>Ingredients:</strong>
        </p>
        <ul>{ingredients}</ul>
        <div className="buttons-group float-right">
          <button
            onClick={() => updateState("edit_recipe", recipe)}
            type="button"
            className="btn btn-outline-primary"
          >
            Edit
          </button>
          <button
            onClick={() => updateState("delete_recipe", recipe)}
            type="button"
            className="btn btn-outline-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function RecipeClosed(recipe) {
  return (
    <div
      key={recipe.id}
      className="list-group-item"
      onClick={() => updateState("tab_active", recipe)}
    >
      {recipe.name}
    </div>
  );
}

export default Recipe;
