/*
Aca vamos a tener la app 

*/
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Profile } from "./pages/Profile";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Header } from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { CreateListing } from "./pages/CreateListing";
import { UpdateListing } from "./pages/UpdateListing";
import { Listing } from "./pages/Listing";

export const App = () => {
  return (
    <BrowserRouter>
      {/* Header en la app que maneja las otras vistas para que se pueda ver en todas las vistas page */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/listing/:listingID" element={<Listing />} />
        {/* Privatizamos la ruta perfil conteniendola con esta otra que tiene tosda la configuracion de privatizacion */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingID"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
