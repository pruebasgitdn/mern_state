import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";

// El prop listing es la publicacion que pasamos desde search.jsx
export const ListingItem = ({ listing }) => {
  return (
    // Despues de medida sm: ocupara un ancho de 330px
    <div className="bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden w-full sm:w-[330px] flex-grow">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageURLs[0]}
          className="h-[320px] object-cover w-full sm:h-[230px] hover:scale-105"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-xl font-bold text-blue-900">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationPin className="text-green-600 w-5 h-5" />
            <p className="text-sm font-semibold text-gray-700 w-full">
              {listing.address}
            </p>
          </div>
          {/* Line clamp - # => de cuantos saltos de linea queda el texto si desborda */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>

          <p className="text-gray-700 text-sm font-semibold">
            {listing.offer ? (
              <span className="text-orange-600">
                {listing.discountPrice.toLocaleString("es-ES")} DESC.
              </span>
            ) : (
              <span className="text-green-400">
                {listing.regularPrice.toLocaleString("es-ES")}
              </span>
            )}
            {listing.type == "rent" && " mensual"}
            {listing.type == "sale" && " TOTAL"}
          </p>

          {/* ROOMS */}
          <div className="flex gap-4">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} habitaciones`
                : `${listing.bedrooms} habitacion`}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baños`
                : `${listing.bathrooms} baño`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
