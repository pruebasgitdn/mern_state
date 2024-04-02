import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Importamos el modulo swiper para hacer las imagenes deslizantes
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

export const Listing = () => {
  //Inicializamos el swiper
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
        </div>
      )}
    </main>
  );
};
