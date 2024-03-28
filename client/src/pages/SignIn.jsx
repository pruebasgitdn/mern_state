import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Importamos reductores y dispatch
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/User/userSlice.js";
import { OAuth } from "../components/OAuth.jsx";

export const SignIn = () => {
  const [formData, setFormData] = useState({});
  // exportamos loading y error del estado global user que es el nombre del slice que creamos
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hacemos peticion al api
    try {
      dispatch(signInStart());
      const res = await fetch("api/auth//signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Le mandamos el valor de los inputs al body de la peticion
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      // Si existe algun error
      if (data.success === false) {
        dispatch(signInFailure(data.message));

        return;
      }
      // Si todo bien...
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.log(error);
    }
  };

  return (
    /*
    max-w => max width lg => 32rem
    */
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-7"> Ingresar</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="border p-3 rounded-lg focus-within: outline-none "
          placeholder="Correo Electronico"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          className="border p-3 rounded-lg focus-within: outline-none "
          placeholder="Contraseña"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className=" uppercase p-3 bg-blue-900 text-white rounded-lg hover:opacity-90 disabled:opacity-30"
        >
          {loading ? "Cargando" : "Ingresar"}
        </button>
        <OAuth />
      </form>
      <div className="flex justify-between my-3">
        <p>No tienes una cuenta?</p>
        <Link to={"/signup"}>
          <span className="mr-3 ">Registrarse</span>
        </Link>
      </div>
      {error && <p className="text-red-500 text-center my-2"> {error} </p>}
    </div>
  );
};
