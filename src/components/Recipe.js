import React from "react";

function Recipe(item, toggleRecipe, deleteRecipe, editRecipe) {
  if (item.edit) {
    return RecipeEdit(item, toggleRecipe);
  } else if (item.open) {
    return RecipeOpened(item, toggleRecipe, deleteRecipe, editRecipe);
  } else {
    return RecipeClosed(item, toggleRecipe);
  }
}

function RecipeOpened(recipe, toggleRecipe, deleteRecipe, editRecipe) {
  var ingredientsArr = recipe.ingredients
    .trim()
    .split(",")
    .filter(item => item !== "");
  var ingredients = ingredientsArr.map((item, idx) => (
    <li key={idx}> {item}</li>
  ));
  return (
    <div className="card" key={recipe.name}>
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
            onClick={() => editRecipe(recipe.id)}
            type="button"
            className="btn btn-outline-primary"
          >
            Edit
          </button>
          <button
            onClick={() => deleteRecipe(recipe.id)}
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

function RecipeEdit(recipe, toggleRecipe, deleteRecipe) {
  console.log(recipe);
  return (
    <div className="card" key={recipe.name}>
      <div className="card-header" onClick={() => toggleRecipe(recipe.id)}>
        {recipe.name}
      </div>
      <div className="card-body">TODO</div>
    </div>
  );
}

function RecipeClosed(recipe, toggleRecipe) {
  return (
    <div
      key={recipe.name}
      className="list-group-item"
      onClick={() => toggleRecipe(recipe.id)}
    >
      {recipe.name}
    </div>
  );
}

export default Recipe;
