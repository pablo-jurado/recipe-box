import React from 'react';
import _ from 'lodash'
import { updateState } from './index'
import './App.css';

function App (state) {
  return (
    <div className="app">
      <h2 className="jumbotron text-center">Recipe Box App</h2>
      <div className="text-center">Total Recipes: {state.recipes.length}</div>
      <br/>
      {AllRecipes(state)}
    </div>
  );
};
function AllRecipes(state) {
  var allRecipes = _.map(state.recipes, function(item) {
    return singleRecipe(item);
  });
  return(
    allRecipes
  );
};

function singleRecipe(recipe) {
  var recipeHtml;
  if(!recipe.active) {
    recipeHtml = <div onClick={updateState.bind(null, recipe, 'active')}>{recipe.name}</div>;
  } else {
    recipeHtml =
      <div>
        <button type="button"
          className="btn btn-secondary float-right"
          onClick={updateState.bind(null, recipe, 'close')}
          >X
        </button>
        <h5 className="card-title">{recipe.name}</h5>
        <p className="card-text">{recipe.description}</p>
        <div>
          <div><strong>Ingredients:</strong></div>
          <div>{Ingredients(recipe.ingredients)}</div>
        </div>
        <div className="buttons-group float-right">
          <button type="button" className="btn btn-primary">Edit</button>
          <button type="button" className="btn btn-danger">Delete</button>
        </div>
        <div className="clearfix"></div>
      </div>
  }
  return (
    <div key={recipe.name} className="card">
      <div className="card-body">
        {recipeHtml}
      </div>
    </div>
  );
};

function Ingredients(state) {
  var ingredientsArr = _.map(state, function(item, index) {
    return (
      <li key={index}>{item}</li>
    );
  });

  return(
    <ul>
      {ingredientsArr}
    </ul>
  );
}

export default App;
