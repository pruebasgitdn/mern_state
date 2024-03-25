import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

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
