import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

export const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    imagesUrls: [],
  });
  console.log(files);
  console.log(formData);
  const handleImageSubmit = (e) => {
    setUploading(true);
    setImageUploadError(false);
    // Si hay una imagen y menor q 7 porq el maximo es 6
    if (files.length > 0 && files.length + formData.imagesUrls.length < 7) {
      // promises array porque vamos a subir mas de 1 imagen entonces vamos a tener mas de 1 comportamiento asincrono y 1 por 1 deben ser subidas al storage
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        // Recorremos el array de archivos(imgs) y por cada archivo lo mandamos al storageimage
        promises.push(storeImage(files[i]));
      }
      // devuelve una promesa que termina correctamente cuando todas las promesas se cumplen y espera por todas las imagenes de "promises" y seteamos el form data
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imagesUrls: formData.imagesUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Error, ( maximo 2mb por imagen ) ");
          setUploading(false);
        });
    } else {
      setImageUploadError("Solo puedes subir 6 imagenes por publicacion");
      setUploading(false);
    }
  };

  //
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      // Obtiene una solicitud del storage de la app
      const storage = getStorage(app);
      // Hacemos el nombre unico agregandole new date
      const fileName = new Date().getTime() + file.name;
      // Referencia(storage,nombrearchivo)
      const storageRef = ref(storage, fileName);
      // uploadBytesResumabe() Carga datos en la ubicación de este objeto storage ref => donde los va a subir, file => los datos a subir
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Carga ${progress}% completa`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    // Mantener todo adentro pero filtrar lo que quiero eliminar
    setFormData({
      ...formData,
      imagesUrls: formData.imagesUrls.filter((_, i) => i !== index),
    });
  };

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
              onChange={(e) => setFiles(e.target.files)}
              accept="image/*"
              multiple
              className="border-y-4 p-3 my-3 border-green-500 rounded w-full"
            />
            {/* Type button para que no envie al form porque hay otro boton q si lo hace  */}
            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-white border-2 bg-green-700 rounded uppercase hover:opacity-90"
            >
              {uploading ? "Subiendo ..." : "Cargar archivos"}
            </button>
          </div>
          <p className="text-red-600 flex-wrap">
            {" "}
            {imageUploadError && imageUploadError}{" "}
          </p>
          {/* Si hay mas de una imagen mapearla */}
          {formData.imagesUrls.length > 0 &&
            formData.imagesUrls.map((url, index) => (
              <div
                key={index}
                className="flex justify-between p-3 border border-green-400 my-2 rounded items-center"
              >
                <img
                  src={url}
                  alt="Listing-image"
                  className="w-20 h-20 rounded-md object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="bg-red-500 text-white p-3 rounded uppercase hover:opacity-90"
                >
                  Eliminar
                </button>
              </div>
            ))}
          <button className="bg-cyan-600 my-4 text-white p-3 rounded uppercase hover:opacity-90">
            Crear publicacion
          </button>
        </div>
      </form>
    </main>
  );
};
