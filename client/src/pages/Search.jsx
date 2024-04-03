import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setLisings] = useState([]);
  const [sidebarData, setSidearData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const handleChange = (e) => {
    // Condiciones para los inputs porque son difererentes: text, checkbox etc

    // Booleanos => || => OR
    if (
      e.target.id == "all" ||
      e.target.id == "rent" ||
      e.target.id == "sale"
    ) {
      // Copiamos la informacion interior y cambiamos el type por el id del input tipeado
      setSidearData({ ...sidebarData, type: e.target.id });
    }

    // Buscador input
    if (e.target.id == "searchTerm") {
      setSidearData({ ...sidebarData, searchTerm: e.target.value });
    }

    // Si el input tiene el true en el cheked o si lo trae en texto, de ahi ponerlo true : de otra manera false
    if (
      e.target.id == "parking" ||
      e.target.id == "furnished" ||
      e.target.id == "offer"
    ) {
      setSidearData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked == "true" ? true : false,
      });
    }

    if (e.target.id == "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      //Lo targetea y separa el valor del id del <otpion> por el'_' en 2 que me da las 2 variables order sort=> ordenar (asc,desc) clasificar(createdAt,regularPrice)

      setSidearData({ ...sidebarData, sort, order });
    }
  };
  console.log(sidebarData);
  console.log(listings);
  const handleSubmit = (e) => {
    e.preventDefault();
    //Agregamos los parametros de busqueda
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    // Obtenemos los parametros de la urñ
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    // Si alguno de estos existe entonces setear el sidebardata con esos valores de la url o || ''
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidearData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl == "true" ? true : false,
        furnished: furnishedFromUrl == "true" ? true : false,
        offer: offerFromUrl == "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    // API Cal
    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      /*
        Esta peticion me ejecuta getlistings como recoradtorio de listing.controller
        */
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setLisings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);
  return (
    <div className="flex flex-col md:flex-row">
      {/*
      en el tamaño poner la linea al lado ya que es la pantalla pequeña movil
      */}
      <div className="p-5 border-b border-blue-500 md:border-r md:border-blue-500 md:min-h-screen ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex gap-3 items-center">
            <label className="whitespace-nowrap	font-bold">
              Termino de busqueda:{" "}
            </label>
            <input
              type="text"
              className="border rounded-lg p-3 w-full"
              id="searchTerm"
              placeholder="Buscar"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label className="font-bold">Tipo:</label>
            <div className="flex gap-2">
              {/* Checked de acuerdo al sidebardata.type, si es 'all' lo chekcea desde el incio */}
              <input
                type="checkbox"
                id="all"
                className="w-5 h-5"
                onChange={handleChange}
                checked={sidebarData.type == "all"}
              />
              <span>Alquiler & Venta</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5 h-5"
                onChange={handleChange}
                checked={sidebarData.type == "rent"}
              />
              <span>Alquiler</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5 h-5"
                onChange={handleChange}
                checked={sidebarData.type == "sale"}
              />
              <span>Venta</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5 h-5"
                onChange={handleChange}
                checked={sidebarData.offer}
              />
              <span>Oferta</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <label className="font-bold">Comodidades:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5 h-5"
                onChange={handleChange}
                checked={sidebarData.parking}
              />
              <span>Parqueadero</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 h-5"
                onChange={handleChange}
                checked={sidebarData.furnished}
              />
              <span>Amoblado</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-bold">Ordenar:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="p-2 rounded-lg border-2 border-gray-300"
            >
              <option value="regularPrice_desc">Precio: Alto a Bajo</option>
              <option value="regularPrice_asc">Precio: Bajo a Alto</option>
              <option value="createdAt_asc">Antiguos</option>
              <option value="createdAt_desc">Nuevos</option>
            </select>
          </div>
          <button className="uppercase bg-cyan-500 p-3 text-white rounded-lg font-semibold hover:opacity-90">
            Buscar
          </button>
        </form>
      </div>

      <div className="">
        <h1 className="font-bold text-3xl border-b border-blue-500 p-3 text-cyan-600 hover:text-cyan-400 m-3">
          Resultados:
        </h1>
      </div>
    </div>
  );
};
