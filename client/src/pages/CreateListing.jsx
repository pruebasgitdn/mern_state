export const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Crea una publicacion
      </h1>
      {/* 
      En tamaño sm:() tendra un display flex-row(flecha)
      */}
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          {/* El id deberia ser igual al campo del lisiting model para guardar los datos con el set*/}
          <input
            type="text"
            className="border p-3 rounded-lg focus-within:outline-none"
            placeholder="Nombre"
            required
            maxLength={60}
            minLength={8}
            id="name"
          />
          <textarea
            type="text"
            className="border p-3 rounded-lg focus-within:outline-none"
            placeholder="Descripcion"
            required
            id="description"
          />
          <input
            type="text"
            className="border p-3 rounded-lg focus-within:outline-none"
            placeholder="Direccion"
            required
            id="address"
          />

          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="sale" />
              <span className="font-bold text-sm">Venta</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="rent" />
              <span className="font-bold text-sm">Alquiler</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="parking" />
              <span className="font-bold text-sm">Parqueadero</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="furnished" />
              <span className="font-bold text-sm">Amoblado</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="offer" />
              <span className="font-bold text-sm">Oferta</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                required
                min="1"
                max="10"
                className="p-3 border border-gray-400 rounded-lg focus-within:outline-none"
              />
              <p className="font-bold">Baños</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                required
                min="1"
                max="10"
                className="p-3 border border-gray-400 rounded-lg focus-within:outline-none"
              />
              <p className="font-bold">Habitaciones</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                required
                min="1"
                max="10"
                className="p-3 border border-gray-400 rounded-lg focus-within:outline-none"
              />
              <div className="flex flex-col items-center">
                <p className="font-bold">Precio normal</p>
                <span className="text-xs font-semibold">( $ / mes)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                required
                min="1"
                max="10"
                className="p-3 border border-gray-400 rounded-lg focus-within:outline-none"
              />
              <div className="flex flex-col items-center">
                <p className="font-bold">Precio con descuento</p>
                <span className="text-xs font-semibold">( $ / mes)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Parte derecha de la columna */}
        <div className="flex flex-col flex-1">
          <p className="font-bold">
            Imagenes: {""}
            <span className="text-gray-500">
              La primera imagen sera la portada (maximo 6).
            </span>
          </p>
          <div className="flex gap-3">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="border-y-4 p-3 my-3 border-green-500 rounded w-full"
            />
            <button className="p-3 text-white border-2 bg-green-700 rounded uppercase hover:opacity-90">
              cargar archivo
            </button>
          </div>
          <button className="bg-cyan-600 my-4 text-white p-3 rounded uppercase hover:opacity-90">
            Crear publicacion
          </button>
        </div>
      </form>
    </main>
  );
};
