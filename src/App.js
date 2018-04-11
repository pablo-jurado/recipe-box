import React from 'react';
import _ from 'lodash';
import { updateState } from './index';
import './App.css';


// TODO: move appstate to this component
function App (state) {
  return (
    <div className="app">
      <h2 className="jumbotron text-center link"
        onClick={ () => updateState("close_editor") }>Recipe Box App</h2>
      <div className="wrapper">
        <ButtonEditor />
        <Editor />
        {/* {AllRecipes(state)} */}
      </div>
    </div>
  );
};


// TODO: add internal state to the form
class Editor extends React.Component {
  constructor() {
    super();

    this.state = {
      "name": "",
      "description": "",
      "ingredients": "",
    };

    this.handleInput = this.handleInput.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);

  }

  handleInput(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  
  saveRecipe(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <form className="recipe-form" onSubmit={this.saveRecipe}>
        <div className="form-group">
          <label htmlFor="recipe-name">Name</label>
          <input
            id="name"
            className="form-control"
            type="text"
            required
            value={this.state.name}
            onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label htmlFor="recipe-description">Description</label>
          <input
            id="description"
            className="form-control"
            type="text"
            required
            value={this.state.description}
            onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label htmlFor="recipe-ingredients">Ingredients</label>
          <div className="input-group">
            <input
              id="ingredients"
              className="form-control"
              type="text"
              required
              value={this.state.ingredients}
              onChange={this.handleInput} />
            </div>
        </div>
        <div className="buttons-group float-right">
          <button className="btn btn-danger" type="button" onClick={ () => updateState("close_editor") }>Cancel</button>
          <input className="btn btn-primary" type="submit" value="Save" />
        </div>
      </form>
    )
  }  
};

function ButtonEditor() {
  return (
    <button className="btn btn-primary"
      onClick={ () => updateState("open_editor") }>
        Add Recipe
    </button>
  );
}

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
