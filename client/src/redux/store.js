/*
REDUX

Store: Representa el estado de la aplicación
Reducers: Son funciones JavaScript puras que determinan como deberá ser actualizado el store

*/
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice.js";
import storage from "redux-persist/lib/storage";

//Persistir y rehidratar una store redux.
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";

/*
combineReducers devuelve un objeto cuyos valores son diferentes funciones reductoras en una única función reductora que puedes enviar a createStore
*/
const rootReducer = combineReducers({ user: userReducer });

//Aca seteamos el nombre del key, la version y el storage
const persistConfig = {
  key: "root",
  storage: storage,
  version: 1,
};

//  devuelve un reductor mejorado
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  /*
  reductor raíz del almacén.
  lo exportamos como key/name user y value userReducer
  */
  reducer: persistedReducer,
  /*
     Un middleware personalizado que detecta si se han incluido valores no serializables en el estado o en las acciones enviadas,
    */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// persistStore (store) = devuelve el objeto persistor y lo exportamos
export const persistor = persistStore(store);
