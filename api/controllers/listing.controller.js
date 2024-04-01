import Listing from "../models/listingModel.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    // función create() que se utiliza a menudo para crear nuevos documentos.
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  // Buscamos por el parametro de la ruta
  const listing = await Listing.findById(req.params.id);
  // Si no la encuentra
  if (!listing) {
    return next(errorHandler(404, "No encontrado"));
  }

  // Verificar si no es igual comparandolo con el req user del middleware verifytoken y el usuario referenciado
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "Solo puedes eliminar tus publicaciones"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Publicacion Eliminada");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  // Si no lo encuentra
  if (!listing) {
    return next(errorHandler(404, "No se ha encontrado la publicacion"));
  }
  // Verificar si pertenece a la cuenta
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "Solo puedes actualizar tus publicaciones"));
  }

  try {
    // Buscamos por id y actualizamos, pasamos el id, el body(datos nuevos), {new:true} => que me devuelva el rgistro nuevo actualizado
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
