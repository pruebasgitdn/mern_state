/*
REDUX

Store: Representa el estado de la aplicación
Reducers: Son funciones JavaScript puras que determinan como deberá ser actualizado el store

*/
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice.js";

export const store = configureStore({
  /*
  Si se trata de una única función, se utilizará directamente como reductor raíz del almacén.
  */
  reducer: { user: userReducer },
  /*
     Un middleware personalizado que detecta si se han incluido valores no serializables en el estado o en las acciones enviadas,
    */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
