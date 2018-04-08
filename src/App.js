import React from 'react';
import _ from 'lodash';
import { updateState } from './index';
import './App.css';

function App (state) {
  return (
    <div className="app">
      <h2 className="jumbotron text-center link"
        onClick={ () => updateState("close_editor") }>Recipe Box App</h2>
      <div className="wrapper">
        {Editor(state.editor)}
        {AllRecipes(state)}
      </div>
    </div>
  );
};

function handleName(e) {
  updateState("update_name", e.target.value);
}

function handleDescription(e) {
  updateState("update_description", e.target.value);
}

function handleIngredients(e) {
  updateState("update_ingredients", e.target.value);
}

function saveRecipe(e) {
  e.preventDefault();
  updateState("save_recipe");
}


function Editor(state) {
  if (state.active) {
    return (
      <form className="recipe-form" onSubmit={saveRecipe}>
        <div className="form-group">
          <label htmlFor="recipe-name">Name</label>
          <input
            id="recipe-name"
            className="form-control"
            type="text"
            required
            value={state.name}
            onChange={handleName} />
        </div>
        <div className="form-group">
          <label htmlFor="recipe-description">Description</label>
          <input
            id="recipe-description"
            className="form-control"
            type="text"
            required
            value={state.description}
            onChange={handleDescription} />
        </div>
        <div className="form-group">
          <label htmlFor="recipe-ingredients">Ingredients</label>
          <div className="input-group">
            <input
              id="recipe-ingredients"
              className="form-control"
              type="text"
              required
              value={state.ingredients}
              onChange={handleIngredients} />
            </div>
        </div>
        <div className="buttons-group float-right">
          <button className="btn btn-danger" type="button" onClick={ () => updateState("close_editor") }>Cancel</button>
          <input className="btn btn-primary" type="submit" value="Save" />
        </div>
      </form>
    )
  } else {
    return (
      <button className="btn btn-primary"
        onClick={ () => updateState("open_editor") }>
          Add Recipe
      </button>
    );
  }
};

function AllRecipes(state) {
  if (!state.editor.active) {
    var allRecipes = _.map(state.recipes, function(item) {
        if (item.active) {
          return RecipeOpened(item)
        } else {
          return RecipeClosed(item)
        }
    });

    return (
      <div>
        <p className="text-center">Total Recipes: {allRecipes.length}</p>
        {allRecipes}
      </div>
    )
  }
};

function RecipeOpened(recipe) {
  var ingredientsArr = recipe.ingredients.trim().split(",").filter(item => item !== "");
  var ingredients = ingredientsArr.map((item, idx) => <li key={idx}> { item }</li>);
  return (
    <div className="card" key={recipe.id}>
      <div className="card-header"
        onClick={ () => updateState('tab_close', recipe)}>
        {recipe.name}
      </div>
      <div className="card-body">
        <p className="card-text">{recipe.description}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>{ ingredients }</ul>
        <div className="buttons-group float-right">
          <button onClick={ () => updateState("edit_recipe", recipe) } type="button" className="btn btn-outline-primary">Edit</button>
          <button onClick={ () => updateState("delete_recipe", recipe) } type="button" className="btn btn-outline-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}

function RecipeClosed(recipe) {
  return (
    <div key={recipe.id}
      className="list-group-item"
      onClick={ () => updateState('tab_active', recipe)}>
      {recipe.name}
    </div>
  );
}

export default App;
