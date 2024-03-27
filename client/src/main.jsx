import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

/*
  El componente <Provider> pone el almacén Redux a disposición de cualquier componente anidado que necesite acceder al almacén Redux.

  Le pasamos el prop store con valor store
*/
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* 
       PersistGate. Esto retrasa la renderización de la interfaz de usuario de la aplicación hasta que el estado persistente se haya recuperado y guardado en redux.
    */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
