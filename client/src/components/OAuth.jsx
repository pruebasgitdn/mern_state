import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/User/userSlice.js";
import { useNavigate } from "react-router-dom";

export const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogle = async () => {
    try {
      /*
      GoogleAuthProvider() = Proveedor de autenticación de Google.
      
      getAuth() = obtiene la autorizacion de la app


      */
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      /*
      signInWithPopup
        (
        proovedor(google),
        autenticacion
        ) = acceder con ventana emergente
      */
      const result = await signInWithPopup(auth, provider);

      // Hacemos la peticion
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          /*
            Mandos el user del resultado del inicio de sesion con el pop up
            */
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      // Si encuentra la data la espera y la descomprime en json, y la despacha al reducer ingreso exitoso
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
      console.log(result);
    } catch (error) {
      console.log("No se puede accede con google: ", error);
    }
  };

  return (
    // Si esta en type button en vez de submit no envia el form
    <button
      onClick={handleGoogle}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90"
    >
      Continuar con google
    </button>
  );
};
