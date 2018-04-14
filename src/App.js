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
        recipeData: null,
        recipes: {}
      };
      localStorage.setItem("appState", JSON.stringify(this.state));
    }

    this.toggleEditor = this.toggleEditor.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.toggleRecipe = this.toggleRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.clearRecipeData = this.clearRecipeData.bind(this);
  }

  toggleEditor() {
    this.setState({ editor: !this.state.editor });  
  }

  addRecipe(recipe) {
    var newState = this.state;
    newState.editor = false;
    newState.recipes[recipe.id] = recipe;
    this.setState( newState );
  }

  toggleRecipe(id) {
    var newRecipes = this.state.recipes;
    newRecipes[id].active = !newRecipes[id].active;
    this.setState({ recipes: newRecipes });  
  }

  deleteRecipe(id) {
    var newRecipes = this.state.recipes;
    delete newRecipes[id];
    this.setState({ recipes: newRecipes });
  }

  editRecipe(id) {
    var recipe = this.state.recipes[id];
    this.setState({ recipeData: recipe });
    this.toggleEditor();
  }

  clearRecipeData() {
    this.setState({ recipeData: null });
  }

  render() {
    localStorage.setItem("appState", JSON.stringify(this.state));
    if (!this.state.editor) {
      return (
        <div className="app">
          <h2 className="jumbotron text-center">Recipe Box App</h2>
          <div className="wrapper">
            <ButtonEditor toggle={ this.toggleEditor } />
            <AllRecipes 
              recipes={ this.state.recipes } 
              toggle={ this.toggleRecipe } 
              deleteRecipe={ this.deleteRecipe }
              editRecipe={ this.editRecipe } />
          </div>
        </div>
      );
    } else {
      return (
        <div className="app">
          <h2 className="jumbotron text-center">Recipe Box App</h2>
          <div className="wrapper">
            <Editor 
              toggle={ this.toggleEditor } 
              submit={ this.addRecipe } 
              recipeData={ this.state.recipeData } 
              clearRecipeData={ this.clearRecipeData } />
          </div>
        </div>
      );
    }
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
    this.props.clearRecipeData();
  }

  handleCancel() {
    this.resetForm();
    this.props.toggle();
  }

  componentWillMount() {
    var recipe = this.props.recipeData;
    if (recipe) {
      if (this.state.name === "") {
        this.setState({
          name: recipe.name,
          description: recipe.description,
          ingredients: recipe.ingredients,
          id: recipe.id,
          active: false
        });
      }
    }
  }

  render() {
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
  var allRecipes = _.map(props.recipes, function(item) {
    if (item.active) {
      return RecipeOpened(item, props.toggle, props.deleteRecipe, props.editRecipe)
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

function RecipeOpened(recipe, toggle, deleteRecipe, editRecipe) {
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
          <button onClick={ () => { editRecipe(recipe.id) } } type="button" className="btn btn-outline-primary">Edit</button>
          <button onClick={ () => { deleteRecipe(recipe.id) } } type="button" className="btn btn-outline-danger">Delete</button>
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
