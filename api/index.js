import express from "express";
import mongoose from "mongoose";
// Dotenv Carga las variables de entorno del archivo .env
import dotenv from "dotenv";

// config. carga los documentos .env
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Conected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.listen(3000, () => {
  console.log("Servidor escuchando en puerto 3000");
});
