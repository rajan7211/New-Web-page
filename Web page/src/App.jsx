import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Register from "./Components/Register";

import Hero from "./Components/Hero";
import Project from "./Components/Project";
import Extension from "./Components/Extension";
import Work from "./Components/Work";
import Data from "./Components/Data";
import Sponser from "./Components/Sponser";
import Whitepace from "./Components/Whitepace";
import Client from "./Components/Client";
import Try from "./Components/Try";
import Company from "./Components/Company";

import Resources from "./pages/Resources";
import Pricingg from "./pages/Pricingg";
import Solutions from "./pages/Solutions";
import Demands from "./pages/Demands";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [userName, setUserName] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.name : "";
  });

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  };

  return (
    <HashRouter>
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Hero />
                <Project />
                <Extension />
                <Work />
                <Data />
                <Sponser />
                <Whitepace />
                <Client />
                <Try />
                <Company />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Login onLogin={handleLogin} />
              <Footer />
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <Register />
              <Footer />
            </>
          }
        />

        <Route
          path="/resources"
          element={
            <>
              <Resources />
              <Footer />
            </>
          }
        />
        <Route
          path="/pricing"
          element={
            <>
              <Pricingg />
              <Footer />
            </>
          }
        />
        <Route
          path="/solutions"
          element={
            <>
              <Solutions />
              <Footer />
            </>
          }
        />
        <Route
          path="/demands"
          element={
            <>
              <Demands />
              <Footer />
            </>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </HashRouter>
  );
}

export default App;




