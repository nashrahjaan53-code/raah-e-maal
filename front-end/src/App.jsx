import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Faqs from "./Pages/Faqs";
import Services from "./Pages/Services";
import Auth from "./Pages/Auth";
import Contact from "./Pages/Contact";
import Tracker from "./Pages/Tracker";
import Scroll from "./Components/Scroll";
import About from "./Pages/About";
import User from "./Dashboards/User";
import Admin from "./Dashboards/Admin";
import AdminGuard from "./Components/AdminGuard";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // AUTH LOGIC
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  // UPDATED LOGIC: Hide layout for Auth AND User Dashboard
  const isDashboardOrAuth =
    location.pathname.startsWith("/auth") ||
    location.pathname.startsWith("/user") ||
    location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen bg-[#05070A] antialiased">
      <Scroll />

      {/* Navbar: Hidden on Auth and Dashboard */}
      {!isDashboardOrAuth && (
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      )}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth"
            element={<Auth setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<User />} />
          <Route
            path="/admin"
            element={
              <AdminGuard>
                <Admin onLogout={handleLogout} />
              </AdminGuard>
            }
          />
        </Routes>
      </main>

      {/* Footer: Hidden on Auth and Dashboard */}
      {!isDashboardOrAuth && <Footer />}
    </div>
  );
}

export default App;
