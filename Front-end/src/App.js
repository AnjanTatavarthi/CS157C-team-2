import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./pages/Navbar";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import GuestDashboard from "./pages/GuestDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import ManagementDashboard from "./pages/ManagementDashboard";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { useState } from "react";

function App() {
  const [auth, setAuth] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setAuth={setAuth}/>} />
        <Route path="/signup" element={<SignupPage setAuth={setAuth}/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/guest" element={<GuestDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/management" element={<ManagementDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
