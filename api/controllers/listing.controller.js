import Listing from "../models/listingModel.js";

export const createListing = async (req, res, next) => {
  try {
    // función create() que se utiliza a menudo para crear nuevos documentos.
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
