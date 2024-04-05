import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { ListingItem } from "../components/ListingItem.jsx";
export const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(saleListings);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        // Hacemos la peticion con la oferta true y limitamos la busqueda a 4
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        // Y si salio bien hacemos la otra peticion de los sgtes componentes
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        // Y si salio bien hacemos la otra peticion de los sgtes componentes
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="max-w-6xl flex flex-col gap-6 p-28 px-3 mx-auto">
        <h1 className="font-bold text-3xl text-emerald-700 lg:text-6xl">
          Encuentra tu <span className="text-green-400">lugar perfecto</span>
          <br></br>con facilidad{" "}
        </h1>

        <div className="text-xs sm:text-sm text-green-600">
          Bienes e Inmuebles es el mejor lugar para encontrar tu vivienda
          perfecta <br />
          Tenemos un gran rango de propiedades para que escojas.
        </div>
        <Link
          to={"/search"}
          className="text-xs font-bold sm:text-sm text-green-900 hover:underline"
        >
          Empezemos..
        </Link>
      </div>
      {/* swiper */}

      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageURLs[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* resultados */}
      <div className="max-w-6xl mx-auto flex flex-col p-3 mt-10 ">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="my-4">
              <h2 className="text-3xl font-bold text-green-700">
                Ofertas recientes
              </h2>
              <Link
                to={"/search?offer=true"}
                className="text-sm text-green-600 hover:underline"
              >
                Mostrar más ofertas
              </Link>
            </div>
            <div className="flex flex-wrap ">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-4">
              <h2 className="text-3xl font-bold text-green-700">
                Sitios recientes en alquiler
              </h2>
              <Link
                to={"/search?type=rent"}
                className="text-sm text-green-600 hover:underline"
              >
                Mostrar más lugares en alquiler
              </Link>
            </div>
            <div className="flex flex-wrap mt-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-4">
              <h2 className="text-3xl font-bold text-green-700">
                Sitios recientes en venta
              </h2>
              <Link
                to={"/search?type=sale"}
                className="text-sm text-green-600 hover:underline"
              >
                Mostrar más lugares en venta
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
