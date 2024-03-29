import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase.js";
export const Profile = () => {
  /*
  Traemos el current user que es un estado del slice user que guarda al usuario que se le manda al formulario de ingreso en el reductor signinsucces .. y proviene del user slice 
  */
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [UploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(filePerc);
  console.log(file);
  console.log(formData);
  console.log(UploadError);

  // useRef es un Hook de React que te permite referenciar un valor que no es necesario para el renderizado.
  const fileRef = useRef(null);

  // firebase storage nos permite almacenar arhivos generados por los usuarios
  // request.resource.size = que el peso del recurso (menos de 2 mb), si no no carga
  // request.resource.contentType.matches = que el contenido sea (imagenes)

  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  // Si hay un archivo ejecutar en handldefileupload
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    // getstorage = Obtiene una instancia de Firebase StorageService para la aplicación Firebase dada.
    const storage = getStorage(app);
    // El nombre del archivo lo hacemos unico con la fecha + el nombre del archivo selecionado
    const filename = new Date().getTime() + file.name;
    // El storageref es la referencia de un objeto que puede ser cargado descargado establecido y eliminado en una ruta, le pasamos el storage, y el archivo
    const storageRef = ref(storage, filename);
    // uploadBytesResumable()=> Carga datos en la ubicación de este objeto. La carga se puede pausar y reanudar y expone actualizaciones de progreso.
    const uploadTask = uploadBytesResumable(storageRef, file);

    // captamos el cambio con el on (en) state_changed (estado cambiado) hacer => {}
    // snapshots piezas de informacion de cada estado cambiado cuando el progreso cambie
    uploadTask.on(
      "state_changed",
      (snapshots) => {
        // progreso es igual a los bytes transferidos a cada snapshot dividido los bytes totlaes por 100 para el porcentaje
        const progress =
          (snapshots.bytesTransferred / snapshots.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setUploadError(true);
        console.log(error);
      },
      () => {
        // getDownloadURL obtener la URL de descarga de un archivo
        // Nos devuelve una promesa y en caso de de exito la pasamas a downloaURL que la guardamos en setFormData
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    /*
    max-w-lg	= max-width: 32rem; (ancho maximo de 32)
    */
    <div className="max-w-xl mx-auto p-3 ">
      <h1 className="text-3xl font-semibold text-center my-7">Perfil</h1>
      <form action="" className="flex flex-col gap-3">
        {/* Escondemos el input y hacemos que se mustre con el ref y la fucion onclick de la img y que acepte solo imagenes*/}
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          id=""
          hidden
          accept="image/*"
        />
        {/* En source de image creamos condicional del actualizar imagen, si formData.avatar(que es la imagen que mandamos por el input file hidden) existe mostrarlo, de otra manera el currentUser.avatar (que es la que tiene sin actualizar)*/}
        <img
          src={formData.avatar || currentUser.avatar}
          alt="perfil foto"
          className="rounded-full h-[150px] w-[150px] object-cover self-center cursor-pointer mt-2"
          // En esta funcion al hacer click abrimos la referencia del input file que esta hidden
          onClick={() => fileRef.current.click()}
        />
        <p className="text-center text-sm">
          {/* Si hay un error: mostrar el span de texto rojo, de otra manera el span cargando, pero si ese porcentaje es igual a 100 mostrar el span verde, de otra manera una coma vacia */}
          {UploadError ? (
            <span className="text-red-700">
              {" "}
              Error en Imagen seleccionada (debe ser menor a 2MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Subiendo imagen, ${filePerc}% completado.`}</span>
          ) : filePerc == 100 ? (
            <span className="text-green-700">Imagen subida con exito!!</span>
          ) : (
            ""
          )}
        </p>
        {/*El id de los inputs llevan el mismo nombre de los campos del modelo user, para targetearlos y añadirles el value (.e.target -- e.target.value) */}
        <input
          type="text"
          className="border p-3 rounded-lg"
          placeholder="Usuario"
          id="username"
        />
        <input
          type="email"
          className="border p-3 rounded-lg"
          placeholder="Email"
          id="email"
        />
        <input
          type="password"
          className="border p-3 rounded-lg"
          placeholder="Contraseña"
          id="password"
        />
        <button className="bg-blue-900 text-white rounded-lg uppercase p-3 hover:opacity-95 disabled:opacity-50">
          Actualizar
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-600 cursor-pointer font-semibold">
          Eliminar Cuenta
        </span>
        <span className="text-red-600 cursor-pointer font-semibold">Salir</span>
      </div>
    </div>
  );
};
