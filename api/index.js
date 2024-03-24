import express from "express";
import mongoose from "mongoose";
// userRouter as router porque se exporto default y le cambiamos el nombre de importacion
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

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
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor escuchando en puerto 3000");
});

// API userRoutes
/*
En esta ruta va a ejectuar el sgte archivo
*/
app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);
