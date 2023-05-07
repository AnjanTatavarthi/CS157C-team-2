import { useState } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";

function App() {
  const [auth, setAuth] = useState(false);
  const location = useLocation();

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/signup" element={<Signup setAuth={setAuth} />} />
          <Route path="/dashboard" element={<Dashboard setAuth={setAuth} />} />
          <Route path="/" element={<LandingPage setAuth={setAuth} />} />


        <Route
          path="/"
          element={
            auth ? (
              // <Home setAuth={setAuth} />
              <Navigate to="/dashboard" state={{ from: location }} replace />
            ) : (
              // <Navigate to="/login" state={{ from: location }} replace />
              <Navigate to="/" state={{ from: location }} replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
