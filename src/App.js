import React from 'react';
import _ from 'lodash';
import './App.css';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

class App extends React.Component {
  constructor() {
    super();

    var appState = JSON.parse(localStorage.getItem("appState"));
    
    if (appState) {
      this.state = appState;
    } else {
      this.state = {
        editor: false,
        recipes: {}
      };
      localStorage.setItem("appState", JSON.stringify(this.state));
    }

    this.toggleEditor = this.toggleEditor.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.toggleRecipe = this.toggleRecipe.bind(this);
  }

  toggleEditor() {
    this.setState({ editor: !this.state.editor });  
  }

  addRecipe(recipe) {
    var newState = this.state;
    newState.editor = false;
    newState.recipes[recipe.id] = recipe;
    this.setState( newState );

    localStorage.setItem("appState", JSON.stringify(this.state));
  }

  toggleRecipe(id) {
    var newRecipes = this.state.recipes;
    newRecipes[id].active = !newRecipes[id].active;
    this.setState({ recipes: newRecipes });  
  }

  render() {
    return (
      <div className="app">
        <h2 className="jumbotron text-center link"
          onClick={ () => { } }>Recipe Box App</h2>
        <div className="wrapper">
          <Editor editor={ this.state.editor } toggle={ this.toggleEditor } submit={ this.addRecipe } />
          <AllRecipes editor={ this.state.editor } recipes={ this.state.recipes } toggle={ this.toggleRecipe } />
        </div>
      </div>
    );
  }
};

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      ingredients: "",
      id: guid(),
      active: false
    };

    this.handleInput = this.handleInput.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleInput(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  
  saveRecipe(e) {
    e.preventDefault();
    this.props.submit(this.state);
    this.resetForm();
  }

  resetForm() {
    this.setState({
      name: "",
      description: "",
      ingredients: "",
      id: guid(),
      active: false
    });  
  }

  handleCancel() {
    this.resetForm();
    this.props.toggle();
  }

  render() {
    if (!this.props.editor) {
      return <ButtonEditor toggle={ this.props.toggle } />
    } else {
      return (
        <form className="recipe-form" onSubmit={ this.saveRecipe }>
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
            <button className="btn btn-danger" type="button" onClick={ this.handleCancel }>Cancel</button>
            <input className="btn btn-primary" type="submit" value="Save" />
          </div>
        </form>
      )
    }
  }  
};

function ButtonEditor(props) {
  return (
    <button className="btn btn-primary"
      onClick={ props.toggle }>
        Add Recipe
    </button>
  );
}

function AllRecipes(props) {
  if (props.editor) {
    return null;
  }

  var allRecipes = _.map(props.recipes, function(item) {
      if (item.active) {
        return RecipeOpened(item, props.toggle)
      } else {
        return RecipeClosed(item, props.toggle)
      }
  });

  return (
    <div>
      <p className="text-center">Total Recipes: {allRecipes.length}</p>
      {allRecipes}
    </div>
  )
};

function RecipeOpened(recipe, toggle) {
  var ingredientsArr = recipe.ingredients.trim().split(",").filter(item => item !== "");
  var ingredients = ingredientsArr.map((item, idx) => <li key={idx}> { item }</li>);
  return (
    <div className="card" key={recipe.id}>
      <div className="card-header"
        onClick={ () => toggle(recipe.id) }>
        {recipe.name}
      </div>
      <div className="card-body">
        <p className="card-text">{recipe.description}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>{ ingredients }</ul>
        <div className="buttons-group float-right">
          <button onClick={ () => { console.log("TODO!!!"); } } type="button" className="btn btn-outline-primary">Edit</button>
          <button onClick={ () => { console.log("TODO!!!"); } } type="button" className="btn btn-outline-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}

function RecipeClosed(recipe, toggle) {
  return (
    <div key={recipe.id}
      className="list-group-item"
      onClick={ () => toggle(recipe.id) }>
      {recipe.name}
    </div>
  );
}

export default App;
