import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
/*
next del middleaware
*/
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  //Encriptar contra, y 10 numero de vueltas de ronda
  const hashedPassord = bcryptjs.hashSync(password, 10);
  const newUser = User({ username, email, password: hashedPassord });
  try {
    // Esperar que guarde en la db
    await newUser.save();
    res.json("Usuario creado con exito!");
  } catch (error) {
    next(error);
  }
};

export const singin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    /*
    Aca buscamos en la bd en el campo email: el email del req body
    */
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return next(errorHandler(404, "Usuario no encontrado"));
    }

    /*
    comparesync() => compara las contraseeñas y devuelve un booleano
    */
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Contraseña invalida"));
    }

    /*
    Si pasa las validaciones de usuario y contraseña ... creamos el token

    payload: carga de datos json
    secret key = llave que solo el servidor conoce

    sign(payload,secret key)
    */

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // Retornar todas las cosas menos la contraseña
    const { password: pass, ...rest } = validUser._doc;

    /*
    Mandamos token a las cookies
    res.cookie(nombrel token, token, opciones{})
    */
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
