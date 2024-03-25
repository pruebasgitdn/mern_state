import { Link } from "react-router-dom";

export const SignUp = () => {
  return (
    /*
    max-w => max width lg => 32rem
    */
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-7"> Registrarse</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          type="text"
          className="border p-3 rounded-lg focus-within: outline-none "
          placeholder="Usuario"
          id="username"
        />
        <input
          type="text"
          className="border p-3 rounded-lg focus-within: outline-none "
          placeholder="Correo Electronico"
          id="email"
        />
        <input
          type="text"
          className="border p-3 rounded-lg focus-within: outline-none "
          placeholder="Contraseña"
          id="password"
        />
        <button className=" uppercase p-3 bg-blue-900 text-white rounded-lg hover:opacity-90 disabled:opacity-30">
          sign up
        </button>
      </form>
      <div className="flex justify-between">
        <p>Ya tienes una cuenta?</p>
        <Link>
          <span className="mr-3 ">Ingresar</span>
        </Link>
      </div>
    </div>
  );
};
