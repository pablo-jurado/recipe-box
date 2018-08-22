import React from "react";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      ingredients: "",
      id: this.guid(),
      active: false
    };

    this.handleInput = this.handleInput.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.guid = this.guid.bind(this);
  }

  handleInput(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  saveRecipe(e) {
    e.preventDefault();
    console.log(this.state);
    this.resetForm();
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4()}`;
  }

  resetForm() {
    this.setState({
      name: "",
      description: "",
      ingredients: "",
      id: this.guid(),
      active: false
    });
  }

  handleCancel() {
    this.resetForm();
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
      <form className="recipe-form" onSubmit={this.saveRecipe}>
        <div className="form-group">
          <label htmlFor="recipe-name">Name</label>
          <input
            id="name"
            className="form-control"
            type="text"
            required
            value={this.state.name}
            onChange={this.handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipe-description">Description</label>
          <input
            id="description"
            className="form-control"
            type="text"
            required
            value={this.state.description}
            onChange={this.handleInput}
          />
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
              onChange={this.handleInput}
            />
          </div>
        </div>
        <div className="buttons-group float-right">
          <button
            className="btn btn-danger"
            type="button"
            onClick={this.handleCancel}
          >
            Cancel
          </button>
          <input className="btn btn-primary" type="submit" value="Save" />
        </div>
      </form>
    );
  }
}

export default Editor;
