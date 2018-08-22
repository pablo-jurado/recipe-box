import React from "react";
import updateState from "./updateState";

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

function Editor(props) {
  return (
    <form className="recipe-form" onSubmit={saveRecipe}>
      <div className="form-group">
        <label htmlFor="recipe-name">Name</label>
        <input
          id="recipe-name"
          className="form-control"
          type="text"
          required
          value={props.editor.name}
          onChange={handleName}
        />
      </div>
      <div className="form-group">
        <label htmlFor="recipe-description">Description</label>
        <input
          id="recipe-description"
          className="form-control"
          type="text"
          required
          value={props.editor.description}
          onChange={handleDescription}
        />
      </div>
      <div className="form-group">
        <label htmlFor="recipe-ingredients">Ingredients</label>
        <div className="input-group">
          <input
            id="recipe-ingredients"
            className="form-control"
            type="text"
            required
            value={props.editor.ingredients}
            onChange={handleIngredients}
          />
        </div>
      </div>
      <div className="buttons-group float-right">
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => updateState("close_editor")}
        >
          Cancel
        </button>
        <input className="btn btn-primary" type="submit" value="Save" />
      </div>
    </form>
  );
}

export default Editor;
