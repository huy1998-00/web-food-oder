import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { createStore } from "redux";
import { Provider } from "react-redux";
import myReducer from "./context/reducers";
import ScrollToTop from "./ultis/styles";

const myStore = createStore(
  myReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop></ScrollToTop>
      <AnimatePresence>
        <Provider store={myStore}>
          <App></App>
        </Provider>
      </AnimatePresence>
    </Router>
  </React.StrictMode>
);
