import React from 'react';
import updateState from './updateState';
import RecipeList from './RecipeList';
import Editor from './Editor';
import './App.css';

function ToggleButton() {
  return (
    <button
      className="btn btn-primary"
      onClick={ () => updateState("open_editor") }>
        Add Recipe
    </button>
  );
}

function App (state) {
  return (
    <div className="app">
      <h2 className="jumbotron text-center link"
        onClick={ () => updateState("close_editor") }>Recipe Box App</h2>
      <div className="wrapper">
        {(state.editor.active)
          ? <Editor editor={state.editor} />
          : <div>
              <ToggleButton />
              <RecipeList recipes={state.recipes} />
            </div>
        }
      </div>
    </div>
  );
};

export default App;