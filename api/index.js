import express from "express";
import mongoose from "mongoose";
// userRouter as router porque se exporto default y le cambiamos el nombre de importacion
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import listingRouter from "./routes/listing.routes.js";
import cors from "cors";
// Cookie Parser es un middleware de Node JS utilizado para obtener datos de cookies.
import cookieParser from "cookie-parser";
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
app.use(cookieParser()); // Ahora podemos obtener informacion de las cookies

app.listen(3000, () => {
  console.log("Servidor escuchando en puerto 3000");
});

// API userRoutes
/*
En esta ruta va a ejectuar el sgte archivo
*/
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use(cors());
// MIDDLEWARES
/*
 err => errores del input
 req => request
 res => response
 next => pasar al sigte middleware
*/
app.use((err, req, res, next) => {
  /*
  statuscode = err.statusCode(codigo esttatus), si no lo tiene poner 500
  */
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
