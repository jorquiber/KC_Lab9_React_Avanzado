import "./App.css";
import AdvertsPage from "./pages/adverts/AdvertsPage";
import LoginPage from "./pages/auth/LoginPage";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AdvertPage from "./pages/adverts/AdvertPage";
import NewAdvertPage from "./pages/adverts/NewAdvertPage";
import RequireAuth from "./pages/auth/components/RequireAuth";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/adverts"
        element={
          <div className="container">
            <RequireAuth>
              <Outlet />
            </RequireAuth>
          </div>
        }
      >
        <Route index element={<AdvertsPage />} />
        <Route path=":id" element={<AdvertPage />} />
        <Route path="new" element={<NewAdvertPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
