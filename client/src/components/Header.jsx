import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const Header = () => {
  // Extramos la propiedad currentuser del objeto state del user slice del reductor
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    /*
    La interfaz URLSearchParams define métodos de utilidad para trabajar con la cadena de consulta

    La propiedad de search de la interfaz de location es una cadena de búsqueda, también llamada cadena de consulta; es decir, una cadena que contiene un '?' seguido de los parámetros de la URL.

    */
    const urlParams = new URLSearchParams(window.location.search);
    // Seteamos el key value que es ? /search?searchTerm="busqueda"que nos lleba a donde busquemos en el nav
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    // Si encuentra el termino lo setea con el valor
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-green-400	">
      <div className="flex justify-between items-center mx-auto p-3 max-w-6xl">
        <Link to="/">
          {/* sm: despues de 680px  */}
          <h1 className="font-bold sm:text-xl flex flex-wrap">
            <span className="text-slate-100">Bienes E </span>
            <span className="text-slate-700"> Inmuebles</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-100  rounded-lg p-2 flex items-center"
        >
          <input
            type="text"
            placeholder="Buscar ..."
            className="bg-transparent focus:outline-none sm:w-60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-500" />
          </button>
        </form>
        {/*  */}
        <ul className="flex gap-2 mx-2 font-semibold">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:text-slate-500">
              Home
            </li>
          </Link>

          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:text-slate-500">
              Nosotros
            </li>
          </Link>

          <Link to="/profile">
            {/* Si el currentuser existe */}
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover"
                src={currentUser.avatar}
                alt="perfilfoto"
              ></img>
            ) : (
              <li className="hidden sm:inline text-slate-700 hover:text-slate-500">
                Ingresar
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};
