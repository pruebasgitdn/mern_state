import { useSelector } from "react-redux";

export const Profile = () => {
  /*
  Traemos el current user que es un estado del slice user que guarda al usuario que se le manda al formulario de ingreso en el reductor signinsucces .. y proviene del user slice 
  */
  const { currentUser } = useSelector((state) => state.user);
  return (
    /*
    max-w-lg	= max-width: 32rem; (ancho maximo de 32)
    */
    <div className="max-w-xl mx-auto p-3 ">
      <h1 className="text-3xl font-semibold text-center my-7">Perfil</h1>
      <form action="" className="flex flex-col gap-3">
        <img
          src={currentUser.avatar}
          alt="perfil foto"
          className="rounded-full h-[150px] w-[150px] object-cover self-center cursor-pointer mt-2"
        />
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
