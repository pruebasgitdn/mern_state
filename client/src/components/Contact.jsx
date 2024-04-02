import { list } from "firebase/storage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Desesctructuramos el prop listing que le pasamos en el listing.jsx que tiene toda la informacion de la publicacion
export const Contact = ({ listing }) => {
  const [landlord, setLanlord] = useState(null);
  const [message, setMessage] = useState(null);

  // Apenas cargue la pagina y cuando haya cabmios el el user ref del listing se ejecuta el useefect y sus funciones
  useEffect(() => {
    const fetchLandlord = async (req, res, next) => {
      try {
        // Por el id referenciado en las tareas, hacemos una peticion al backend buscando el usuario por ese id usuario
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLanlord(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLandlord();
  }, [listing.userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  console.log(message);
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-3">
          <p>
            Contactar a{" "}
            <span className="font-semibold">{landlord.username}</span> para{" "}
            <span className="font-semibold">{listing.name}</span>
          </p>
          <textarea
            name="message"
            id="message"
            placeholder="Ingresa tu mensaje aquí.."
            rows="2"
            className="w-full border p-3 rounded-lg"
            onChange={onChange}
          ></textarea>

          {/*  */}
          <Link
            className="bg-blue-950 text-center uppercase text-white p-3 rounded-md hover:opacity-90"
            to={`mailto:${landlord.email}?subject=Regarding${listing.name}&body=${message}`}
          >
            Enviar Mensaje
          </Link>
        </div>
      )}
    </>
  );
};
