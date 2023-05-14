import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/index";
import { loadState, saveState } from "./utils/localStorage";
import { createBrowserHistory } from "history";
import { Router } from "react-router";

if (typeof window !== "undefined") {
  const initialState = loadState();

  let composeEnhacers;
  if (process.env.NODE_ENV === "production") composeEnhacers = compose;
  else composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducer,
    initialState,
    composeEnhacers(applyMiddleware(thunk))
  );
  const history = createBrowserHistory();

  store.subscribe(() => {
    saveState(store.getState());
  });

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
}
