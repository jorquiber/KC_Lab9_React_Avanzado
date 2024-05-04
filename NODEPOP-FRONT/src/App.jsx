import { useState } from "react";
import "./App.css";
import AdvertsPage from "./pages/adverts/AdvertsPage";
import LoginPage from "./pages/auth/LoginPage";
import { useAuth } from "./pages/auth/context";

function App() {
  const { isLogged } = useAuth();
  return <div>{isLogged ? <AdvertsPage /> : <LoginPage />}</div>;
}

export default App;
