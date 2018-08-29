import React from "react";

function updateState(x, y) {
  console.log(x, y);
}

function Recipe(item, toggleRecipe) {
  if (item.active) {
    return RecipeOpened(item, toggleRecipe);
  } else {
    return RecipeClosed(item, toggleRecipe);
  }
}

function RecipeOpened(recipe, toggleRecipe) {
  var ingredientsArr = recipe.ingredients
    .trim()
    .split(",")
    .filter(item => item !== "");
  var ingredients = ingredientsArr.map((item, idx) => (
    <li key={idx}> {item}</li>
  ));
  return (
    <div className="card" key={recipe.id}>
      <div className="card-header" onClick={() => toggleRecipe(recipe.id)}>
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

function RecipeClosed(recipe, toggleRecipe) {
  return (
    <div
      key={recipe.id}
      className="list-group-item"
      onClick={() => toggleRecipe(recipe.id)}
    >
      {recipe.name}
    </div>
  );
}

export default Recipe;
