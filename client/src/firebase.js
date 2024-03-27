// ESTE ARCHIVO ME MANEJA LAS CONFIGURACIONES DE FIRE BASE Y AUTENTICACION CON LA CUENTA DE GOOGLE
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-32670.firebaseapp.com",
  projectId: "mern-estate-32670",
  storageBucket: "mern-estate-32670.appspot.com",
  messagingSenderId: "185976881674",
  appId: "1:185976881674:web:75af9cee64fe7cdfe215f3",
};

// Inicializamos la app
// Y la exportamos con todas las configuraciones de firebase
export const app = initializeApp(firebaseConfig);
