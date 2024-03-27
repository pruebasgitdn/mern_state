import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { OAuth } from "../components/OAuth";

export const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Hacemos peticion al api
    try {
      const res = await fetch("api/auth/signup", {
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
        setLoading(false);
        setError(data.message);

        return;
      }
      // Si todo bien...
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error);
    }
  };

  return (
    /*
    max-w => max width lg => 32rem
    */
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-7"> Registrarse</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="border p-3 rounded-lg focus-within: outline-none "
          placeholder="Usuario"
          id="username"
          onChange={handleChange}
        />
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
          {loading ? "Cargando" : "Registrarse"}
        </button>
        <OAuth />
      </form>
      <div className="flex justify-between my-3">
        <p>Ya tienes una cuenta?</p>
        <Link to={"/signin"}>
          <span className="mr-3 ">Ingresar</span>
        </Link>
      </div>
      {error && <p className="text-red-500 text-center my-2"> {error} </p>}
    </div>
  );
};
