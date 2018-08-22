import React from "react";
import _ from "lodash";
import Recipe from "./Recipe";

function RecipeList(props) {
  var list = _.map(props.recipes, function(item) {
    return Recipe(item);
  });

  return (
    <div>
      <p className="text-center">Total Recipes: {list.length}</p>
      {list}
    </div>
  );
}

export default RecipeList;
