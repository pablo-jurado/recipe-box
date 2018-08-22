import React from "react";
import Editor from "./Editor";
import "./App.css";

// function ToggleButton() {
//   return (
//     <button
//       className="btn btn-primary"
//       onClick={() => updateState("open_editor")}
//     >
//       Add Recipe
//     </button>
//   );
// }

function App() {
  return (
    <div className="app">
      <h2 className="jumbotron text-center link">Recipe Box App</h2>
      <Editor />

      {/* <div className="wrapper">
        {state.editor.active ? (
          <Editor editor={state.editor} />
        ) : (
          <div>
            <ToggleButton />
            <RecipeList recipes={state.recipes} />
          </div>
        )}
      </div> */}
    </div>
  );
}

export default App;
