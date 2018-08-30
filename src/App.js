import React from "react";
import Editor from "./components/Editor";
import RecipeList from "./components/RecipeList";
import { connect } from "react-redux";
import { openEditor } from "./actions";
import "./css/App.css";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <h2 className="jumbotron text-center link">Recipe Box App</h2>
        <div className="wrapper">
          {this.props.editor ? (
            <Editor />
          ) : (
            <div>
              <button
                className="btn btn-primary"
                onClick={() => this.props.openEditor()}
              >
                Add Recipe
              </button>
              <RecipeList />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    editor: state.editor,
    recipes: state.recipes
  };
};

const mapDispatchToProps = dispatch => ({
  openEditor: () => dispatch(openEditor())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
