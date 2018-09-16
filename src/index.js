/* global localStorage */
import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/reducer";

const store = createStore(rootReducer);

store.subscribe(() => {
  localStorage.setItem("appState", JSON.stringify(store.getState()));
});

const root = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
