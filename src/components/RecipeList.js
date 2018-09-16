import React from "react";
import Recipe from "./Recipe";
import { connect } from "react-redux";
import { toggleRecipe, deleteRecipe, openEditor } from "../actions";

function RecipeList(props) {
  var list = props.recipes.map(function(item) {
    return Recipe(
      item,
      props.toggleRecipe,
      props.deleteRecipe,
      props.openEditor
    );
  });

  return (
    <div>
      <p className="text-center">Total Recipes: {list.length}</p>
      {list}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes
  };
};

const mapDispatcjToProps = dispatch => {
  return {
    toggleRecipe: id => dispatch(toggleRecipe(id)),
    deleteRecipe: id => dispatch(deleteRecipe(id)),
    openEditor: recipe => dispatch(openEditor(recipe))
  };
};

export default connect(
  mapStateToProps,
  mapDispatcjToProps
)(RecipeList);
