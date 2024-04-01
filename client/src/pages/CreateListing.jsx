import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CreateListing = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Referenciamos el usuario que crea la tarea trayendolo del estado user userlice.js
  const { currentUser } = useSelector((state) => state.user);

  // Form data de los inputs
  const [formData, setFormData] = useState({
    imageURLs: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    parking: false,
    offer: false,
    regularPrice: 5000,
    discountPrice: 0,
  });
  console.log(files);
  console.log(formData);
  const handleImageSubmit = (e) => {
    setUploading(true);
    setImageUploadError(false);
    // Si hay una imagen y menor q 7 porq el maximo es 6
    if (files.length > 0 && files.length + formData.imageURLs.length < 7) {
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
            imageURLs: formData.imageURLs.concat(urls),
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
      imageURLs: formData.imageURLs.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    // Manejamos la condicion para el formdata.type
    // Si el input es rent o sale seteamos el formdata en el atributo type con con id del input marcado
    if (formData.type == "rent" || formData.type == "sale") {
      setFormData({ ...formData, type: e.target.id });
    }

    // Manejamos la condicion para los otros valores que son booleanos
    // SI clickamos en un id de estos lo seteamos en el formdata el id del input al atributo del formdata y checked el valor del input (booleano)
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    // Manejamos la otra condicion
    // Para el click por el tipo de input
    if (
      e.target.type == "number" ||
      e.target.type == "text" ||
      e.target.type == "textarea"
    ) {
      // lo seteamos en el formdata el id del input al atributo del formdata y checked el valor del input
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Que se envie 1 o mas img
      if (formData.imageURLs.length < 1) {
        return setError("Debes subir al menos 1 imagen");
      }

      // Precio normal y descuento no puede ser mayor
      if (+formData.regularPrice < +formData.discountPrice) {
        return setError(
          "El precio de descuento debe ser mas bajo que el precio regular"
        );
      }

      setLoading(true);
      setError(false);

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success == false) {
        setError(data.message);
      }

      // Si todo sale bien redireccionarlo
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Crea una publicacion
      </h1>
      {/* 
      En tamaño sm:() tendra un display flex-row(flecha)
      */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        {/* Parte izquierda columna */}
        <div className="flex flex-col gap-4 flex-1">
          {/* El id deberia ser igual al campo del lisiting model para guardar los datos con el set*/}
          <input
            type="text"
            className="border p-3 rounded-lg focus-within:outline-none"
            placeholder="Nombre"
            required
            maxLength={60}
            minLength={7}
            id="name"
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            className="border p-3 rounded-lg focus-within:outline-none"
            placeholder="Descripcion"
            required
            id="description"
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            className="border p-3 rounded-lg focus-within:outline-none"
            placeholder="Direccion"
            required
            id="address"
            onChange={handleChange}
            value={formData.address}
          />

          {/* CHECKBOX */}
          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-2">
              {/* input. checked va a ser checkeado dependiendo del formdata.type */}
              <input
                type="checkbox"
                className="w-5"
                id="sale"
                onChange={handleChange}
                checked={formData.type == "sale"}
              />
              <span className="font-bold text-sm">Venta</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="rent"
                onChange={handleChange}
                checked={formData.type == "rent"}
              />
              <span className="font-bold text-sm">Alquiler</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="parking"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span className="font-bold text-sm">Parqueadero</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="furnished"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span className="font-bold text-sm">Amoblado</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="offer"
                onChange={handleChange}
                checked={formData.offer}
              />
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
                onChange={handleChange}
                value={formData.bathrooms}
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
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p className="font-bold">Habitaciones</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                required
                min="100"
                max="1000000000"
                className="p-3 border border-gray-400 rounded-lg focus-within:outline-none"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p className="font-bold">Precio normal</p>

                <span className="text-xs font-semibold">
                  ( $ PESOS COLOMBIANOS / mes)
                </span>
              </div>
            </div>

            {/* Si la oferta es verdadera se muestra el input para introducir valor de oferta si no no */}
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  required
                  min="100"
                  max="1000000000"
                  onChange={handleChange}
                  value={formData.discountPrice}
                  className="p-3 border border-gray-400 rounded-lg focus-within:outline-none"
                />
                <div className="flex flex-col items-center">
                  <p className="font-bold">Precio con descuento</p>
                  <span className="text-xs font-semibold">
                    ( $ PESOS COLOMBIANOS / mes)
                  </span>
                </div>
              </div>
            )}
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
          {formData.imageURLs.length > 0 &&
            formData.imageURLs.map((url, index) => (
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
          <button
            disabled={loading || uploading}
            className="bg-cyan-600 my-4 text-white p-3 rounded uppercase hover:opacity-90"
          >
            {loading ? "Creando ..." : "Crear publicacion"}
          </button>
          {/* Si hay un error mostrarlo */}
          {error && <p className="text-red-500 text-sm">{error} </p>}
        </div>
      </form>
    </main>
  );
};
