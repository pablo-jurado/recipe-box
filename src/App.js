import React from 'react';
import _ from 'lodash';
import { updateState } from './index';
import './App.css';

function App (state) {
  return (
    <div className="app">
      <h2 className="jumbotron text-center">Recipe Box App</h2>
      <div className="wrapper">      
        {Editor(state.editor)}
        {AllRecipes(state)}
      </div>
    </div>
  );
};

function handleName(e) {
  updateState("recipe_name", e.target.value);
}

function handleDescription(e) {
  updateState("recipe_description", e.target.value);
}

function handleIngredient(e) {
  updateState("recipe_ingredient", e.target.value);
}

function Editor(state) {
  if (state.active) {
    return (
      <form className="recipe-form">
        <div className="form-group">
          <label htmlFor="recipe-name">Name</label>
          <input
            id="recipe-name" 
            className="form-control" 
            value={state.name}
            onChange={handleName} />
        </div>
        <div className="form-group">
          <label htmlFor="recipe-description">Description</label>
          <input
            id="recipe-description" 
            className="form-control" 
            value={state.description}
            onChange={handleDescription} />
        </div>
        <div className="form-group">
          <label htmlFor="recipe-ingredients">Ingredients</label>
          <input 
            id="recipe-ingredients" 
            className="form-control" 
            value={state.ingredient} 
            onChange={handleIngredient} />
        </div>
        <ul>
          {Ingredients(state.allIngredients)}
        </ul>
        <div className="buttons-group float-right">
          <button className="btn btn-primary">Save</button>
          <button className="btn btn-danger" onClick={updateState.bind(null, "close_editor")}>Cancel</button>
        </div>
      </form>
    )
  } else {
    return (
      <button className="btn btn-primary" 
        onClick={updateState.bind(null, "open_editor")}>
          New Recipe
      </button>
    );
  }
};

function AllRecipes(state) {
  if (!state.editor.active) {
    var allRecipes = _.map(state.recipes, function(item) {
      return item.active ? recipeOpened(item) : recipeClosed(item);
    });

    return (
      <div>
        <p className="text-center">Total Recipes: {state.recipes.length}</p>
        {allRecipes}
      </div>
    )
  }
};

function recipeOpened(recipe) {
  return (
    <div className="card" key={recipe.name}>
      <div className="card-header"
        onClick={updateState.bind(null, 'close', recipe)}>
        {recipe.name}
      </div>
      <div className="card-body">
        <p className="card-text">{recipe.description}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
          {Ingredients(recipe.ingredients)}
        </ul>
        <div className="buttons-group float-right">
          <button type="button" className="btn btn-primary">Edit</button>
          <button type="button" className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}

function recipeClosed(recipe) {
  return (
    <div key={recipe.name}
      className="list-group-item"
      onClick={updateState.bind(null, 'active', recipe)}>
      {recipe.name}
    </div>
  );
}

function Ingredients(state) {
  var ingredientsArr = _.map(state, function(item, index) {
    return <li key={index + item}>{item}</li>;
  });

  return ingredientsArr;
}

export default App;
