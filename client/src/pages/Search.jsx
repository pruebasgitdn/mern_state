export const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Lado izq 
      
      en el tamaño poner la linea al lado ya que es la pantalla pequeña movil
      */}
      <div className="p-5 border-b border-blue-500 md:border-r md:border-blue-500 md:min-h-screen ">
        <form className="flex flex-col gap-5">
          <div className="flex gap-3 items-center">
            <label className="whitespace-nowrap	font-bold">
              Termino de busqueda:{" "}
            </label>
            <input
              type="text"
              className="border rounded-lg p-3 w-full"
              placeholder="Buscar"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label className="font-bold">Tipo:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5 h-5" />
              <span>Alquiler & Venta</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5 h-5" />
              <span>Alquiler</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5 h-5" />
              <span>Venta</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5 h-5" />
              <span>Oferta</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <label className="font-bold">Comodidades:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5 h-5" />
              <span>Parqueadero</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5 h-5" />
              <span>Amoblado</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-bold">Ordenar:</label>
            <select
              id="sort_order"
              className="p-2 rounded-lg border-2 border-gray-300"
            >
              <option value="">Precio: Alto a Bajo</option>
              <option value="">Precio: Bajo a Alto</option>
              <option value="">Antiguos</option>
              <option value="">Nuevos</option>
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
