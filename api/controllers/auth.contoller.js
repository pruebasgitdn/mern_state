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

export const google = async (req, res, next) => {
  try {
    //Va  a buscar user en En modelo user en el campo email, con el email que mandamos el el body de la ventana pop up
    const user = await User.findOne({ email: req.body.email });

    // Si el usuario existe
    if (user) {
      // Guardamos el token q va a ser igual al id del user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // Si el usuario no existe generamos la contraseña nueva, el user y foto por defect

      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassord = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        // Creamos un usuario lo seperamos unimos minuscula y añadimos numeros random pa hacer unico
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassord,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = newUser._doc; //Devolvemos todo menos la contraseña

      // Mandos el token y la respuesta sin la contraseña
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
