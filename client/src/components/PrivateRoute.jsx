import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  // Exportamos el current user del state del user slice que esta null inicial mente y se llena cuando hay un inicio de sesion exitoso

  const { currentUser } = useSelector((state) => state.user);

  /*
    Outlet = Un <Outlet> en los elementos de ruta padre para renderizar sus elementos de ruta hijo

    --> Preguntamos si existe el current User si es asi lo pasamos al outlet que renderiza la ruta hija <Profile> (componente del App,jsx)
    */
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
}
