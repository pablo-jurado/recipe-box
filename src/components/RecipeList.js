import React from "react";
import Recipe from "./Recipe";
import { connect } from "react-redux";
import { toggleRecipe } from "../actions";

function RecipeList(props) {
  var list = props.recipes.map(function(item) {
    return Recipe(item, props.toggleRecipe);
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
    toggleRecipe: id => dispatch(toggleRecipe(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatcjToProps
)(RecipeList);
