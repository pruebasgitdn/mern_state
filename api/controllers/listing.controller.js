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

// Este getlistin nos obtiene el id para mas tarde modificarlo

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Publicacion no encontrada"));
    }
    res.status(200).json(listing);
  } catch (error) {}
};

export const getListings = async (req, res, next) => {
  try {
    /*
    req.query es un objeto que contiene la propiedad para cada parámetro de cadena de consulta en la ruta

    Ejemplo

    "https://educative.io/user?name=Paulo&isAuthor=true"

    --> Del código anterior, las cadenas de consulta son name y isAuthor
     --> req.query = {name: "Paulo", isAuthor: true}


    
    */
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    // Al principio de la busqueda el checkbox estara desabilitado por defecto(false), entonces si es igual a undefined o falso entonces buscar en la data de base ambos por false y true para que me traiga todo al principio ya que al inicio es lo que queremos es mostrar mabos casos
    if (offer == undefined || offer == "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished == undefined || furnished == "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking == undefined || parking == "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    /*
    type == "all"
    */
    if (type == undefined || type == "all") {
      type = { $in: ["sale", "rent"] };
    }

    // Temino de busqueda
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    /*
    $regex Proporciona funciones de coincidencia de patrones de cadenas en las consultas. es decir, que encuentra las letras que concuerden con la busqueda

    $options {i} = No se preocupoa por mayúsculas y minúsculas.

    Buscar en la base de datos en listings por el apartado name: con esas opciones, las sgtes cosas oferta, amoblado, parqueadero, tipo
    */
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
