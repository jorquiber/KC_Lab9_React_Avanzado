import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { setAuthorizationHeader } from "./api/client";

const answer = setAuthorizationHeader(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0YjM4M2YyYi0xYjE2LTRlODctYTc5Mi00NjgxODFhZmI3NTEiLCJpYXQiOjE3MTQ4MjUyMzksImV4cCI6MTc0NjM4MjgzOX0.Iai_r9QmhBIjHoE4OmsZIPcQQQOAQN9EMu5OnEnay2s"
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
