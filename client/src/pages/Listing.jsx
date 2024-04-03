import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// Importamos el modulo swiper para hacer las imagenes deslizantes
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaMapMarkedAlt,
  FaBed,
  FaCar,
  FaMailBulk,
} from "react-icons/fa";
import { MdChair } from "react-icons/md";
import { Contact } from "../components/Contact";

export const Listing = () => {
  //Inicializamos el swiper
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);

  //   Importamos el usuario del redux
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser._id + listing?.userRef);

  useEffect(() => {
    const fetchlisting = async () => {
      try {
        setLoading(true);
        // El params.listingID es para capturar el valor del id por la url que le definimos en la ruta
        const res = await fetch(`/api/listing/get/${params.listingID}`);

        const data = await res.json();

        if (data.sucess == false) {
          setError(true);
          setLoading(false);
          return;
        }

        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchlisting();

    // Correr el useeffect cada vez que cambie el listingID del params de la ruta
  }, [params.listingID]);
  console.log(loading);
  // Si listing existe mostrar la publicacion, el listing viene del setlisting el cual viene despues de haber hecho la peticion  que haya traido los datos corrctos
  return (
    <main>
      {loading && <p className="text-center"> Cargando ... </p>}

      {error && <p className="text-red-500">Algo salió mal.</p>}

      {/* Si existe listing y no hay loading y no hay errores mostrar lo del parentesiss */}
      {listing && !loading && !error && (
        <div>
          {/* Swiper renderiza todos los slides */}
          <Swiper navigation>
            {listing.imageURLs.map((url) => (
              //Es cada una de las partes deslizantes
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ${" "}
              {listing.offer ? (
                <span className="bg-orange-500 p-1 rounded-md text-white">
                  {listing.discountPrice.toLocaleString("es-ES")} Descuento
                </span>
              ) : (
                <span className="bg-green-700 p-1 rounded-md text-white hover:bg-green-500">
                  {listing.regularPrice.toLocaleString("es-ES")} Precio regular
                </span>
              )}
              {listing.type === "rent" && " / mes"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkedAlt className="text-green-700 text-3xl" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "Para alquiler" : "Para la venta"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {" "}
                  Valor total: ${+listing.regularPrice - +listing.discountPrice}
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Descripcion - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} habitaciones `
                  : `${listing.bedrooms} habitacion `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baños `
                  : `${listing.bathrooms} baño `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaCar className="text-lg" />
                {listing.parking ? "Parqueadero" : "Sin parqueadero"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <MdChair className="text-lg" />
                {listing.furnished ? "Amoblado" : "No amoblado"}
              </li>
            </ul>

            {/* El usuario actual compararlo con el userref del listin que es la referencia del user que creo la publicacion y si son diferentes mostrar el boton de contactar propietario porque esa persona es la que vera el boton mas no el propietario porque lo esta ofreciendo  */}
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-blue-900 text-white rounded-lg uppercase font-bold hover:opacity-90 p-2 flex items-center justify-center gap-2 my-2"
              >
                Contactar al propietario
                <FaMailBulk></FaMailBulk>
              </button>
            )}
            {/* Si contact es true mostrar el componente contact y al componente contact le pasamos el prop listing que tendra toda la informacion de la publicion */}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
};
