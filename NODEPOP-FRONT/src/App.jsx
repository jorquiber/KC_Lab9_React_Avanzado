import { useState } from "react";
import "./App.css";
import AdvertsPage from "./pages/adverts/AdvertsPage";
import LoginPage from "./pages/auth/LoginPage";
import { useAuth } from "./pages/auth/context";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AdvertPage from "./pages/adverts/AdvertPage";
import NewAdvertPage from "./pages/adverts/NewAdvertPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/adverts"
        element={
          <div className="container">
            <Outlet />
          </div>
        }
      >
        <Route index element={<AdvertsPage />} />
        <Route path=":id" element={<AdvertPage />} />
        <Route path="new" element={<NewAdvertPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/404" element={<div>404 | Not found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
