import React from 'react';
import _ from 'lodash';
import { updateState } from './index';
import './App.css';

function App (state) {
  return (
    <div className="app">
      <h2 className="jumbotron text-center">Recipe Box App</h2>
      <p className="text-center">Total Recipes: {state.recipes.length}</p>
      <br/>
      {AllRecipes(state)}
    </div>
  );
};
function AllRecipes(state) {
  var allRecipes = _.map(state.recipes, function(item) {
    return item.active ? openRecipe(item) : closeRecipe(item);
  });

  return allRecipes;
};

function openRecipe(recipe) {
  return (
    <div className="card" key={recipe.name}>
      <div className="card-header"
        onClick={updateState.bind(null, recipe, 'close')}>
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

function closeRecipe(recipe) {
  return (
    <div key={recipe.name}
      className="list-group-item"
      onClick={updateState.bind(null, recipe, 'active')}>
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
