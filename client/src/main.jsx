import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

/*
  El componente <Provider> pone el almacén Redux a disposición de cualquier componente anidado que necesite acceder al almacén Redux.

  Le pasamos el prop store con valor store
*/
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
