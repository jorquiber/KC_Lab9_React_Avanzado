import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { setAuthorizationHeader } from "./api/client";
import storage from "./utils/storage";

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App isDefaultLogged={!!accessToken} />
  </React.StrictMode>
);
