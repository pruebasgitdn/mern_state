// Este archivo tiene la funcion middleware que verifica si el usuario esta logeado o no

import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Accedemos al objeto cookie que mandamos con el nombre que mandamos (access_token)
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Sin autorizacion"));
  }

  // veirify = verifica el token , token, key, callback (Error,exito) => {}
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // Si el token no pasa la verificacion
    if (err) {
      return next(errorHandler(403, "Prohibido"));
    }
    // Si el token pasa la verificacion,el request user lo igualamos al user que tiene la cookie
    req.user = user;
    // Y el next ejecuta el middleware que sigue que eseria la funcion porque esto es un middleware
    next();
  });
};
