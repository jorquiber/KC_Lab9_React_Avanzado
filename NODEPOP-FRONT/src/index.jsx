import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { setAuthorizationHeader } from "./api/client";
import storage from "./utils/storage";
import { AuthContextProvider } from "./pages/auth/context";

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider isDefaultLogged={!!accessToken}>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
