import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  // Extramos la propiedad currentuser del objeto state del user slice del reductor
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-green-400	">
      <div className="flex justify-between items-center mx-auto p-3 max-w-6xl">
        <Link to="/">
          {/* sm: despues de 680px  */}
          <h1 className="font-bold sm:text-xl flex flex-wrap">
            <span className="text-slate-100">Bienes e </span>
            <span className="text-slate-700">Inmuebles</span>
          </h1>
        </Link>

        <form className="bg-slate-100  rounded-lg p-2 flex items-center">
          <input
            type="text"
            placeholder="Buscar ..."
            className="bg-transparent focus:outline-none sm:w-60"
          />
          <FaSearch className="text-slate-500" />
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
