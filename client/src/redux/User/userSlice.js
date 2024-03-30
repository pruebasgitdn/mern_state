/*
Un slice es una porción específica del estado de la aplicación que incluye su propio reducer y las acciones asociadas

*/

import { createSlice } from "@reduxjs/toolkit";

// Creando el  estado inicial del slice
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

// Creando el slice
const userSlice = createSlice({
  // Un nombre, utilizado en los tipos de acción
  // El estado inicial para el reductor
  // Un objeto de "reductores de casos
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signInSuccess: (state, action) => {
      /*
            action la accion que recibimos de la bdd
            */
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Exportamos los reducers de las acciones del userslice
export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} = userSlice.actions;

// Exportamos el slice
export default userSlice.reducer;
