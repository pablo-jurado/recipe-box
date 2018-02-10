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
    return closeRecipe(recipe);
  } else {
    return openRecipe(recipe);
  }

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
          <div>
            <div><strong>Ingredients:</strong></div>
            {Ingredients(recipe.ingredients)}
          </div>
          <div className="buttons-group float-right">
            <button type="button" className="btn btn-primary">Edit</button>
            <button type="button" className="btn btn-danger">Delete</button>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>
  );
}

function closeRecipe(recipe) {
  return (
    <div key={recipe.name}
      className="list-group-item"
      onClick={updateState.bind(null, recipe, 'active')}
      >{recipe.name}
    </div>
  );
}

function Ingredients(state) {
  var ingredientsArr = _.map(state, function(item, index) {
    return <li key={index}>{item}</li>
  });

  return(
    <ul>
      {ingredientsArr}
    </ul>
  );
}

export default App;
