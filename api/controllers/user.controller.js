import Listing from "../models/listingModel.js";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

/*
Controladores del API Users
*/
export const test = (req, res) => {
  res.json({
    msg: "Coño e tu madre",
    test: "API TEST WORKING",
  });
};

export const updateUser = async (req, res, next) => {
  // Si el id del usuario que pasamos en el middleware de la ruta anterio verifyToken() en "verifyUser.js" no es igual al que se le manda por el post en el "user.router.js (router.post("/update/:id ) "
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "Solo puedes actualizar tu propia cuenta"));
  }
  try {
    // Si el usuario intenta cambiar la contraseña
    if (req.body.password) {
      //hashSync()  para generar sincrónicamente un hash para la cadena
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Actualizamos el usuario por el id ( req.params.id => el q pasamos por URL ) y $set los valores a reemplazar en el id del usuario
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        //  $set sustituye el valor de un campo por el valor especificado.
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
        // {new:true} = para que nos de la informacion nueva actualizada
      },
      { new: true }
    );

    // Separamos la contraseña del resto
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  // Si el user req.user.id que pasamos en el verifyToken es diferente al req.params.id que pasamos por la url
  if (req.user.id != req.params.id) {
    return next(errorHandler(401, "Solo puedes eliminar tu propia cuenta"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("Usuario ha sido eliminado con exito!");
  } catch (error) {
    next(error);
  }
};

//Funcion para obtener las publicaciones del usuario
export const getUserListings = async (req, res, next) => {
  // Si el req.user.id que pasamos en verify token que vecrifica el usuario (middleware) es igual al que pasamos por la ruta /listins/:id
  if (req.user.id == req.params.id) {
    try {
      // BUscar en el modelo listings en la columna userref por el req.params.id que se le pasa por la ruta a la peticion /listins/:id
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "Solo puedes ver tus publicaciones"));
  }
};
