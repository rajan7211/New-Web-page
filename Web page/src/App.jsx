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

import Resources from "./pages/Contact";
import Pricingg from "./pages/Pricingg";
import Solutions from "./pages/Solutions";
import Demands from "./pages/Demands";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAuth from "./hooks/useAuth";

import { HashRouter, Routes, Route } from "react-router-dom";


function App() {
 const {
  isLoggedIn,
  user,
  login,
  logout,
 } = useAuth();



  return (
    <HashRouter>
      <Navbar
      isLoggedIn={isLoggedIn}
      userName={user?.name}
      onLogout={logout}
      
      />
      <Routes>
       <Route
       path="/login"
       element = {<Login onLogin={login}/>}
       />

       <Route
       path="/register"
       element = {<Register/>}
       />
       

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
              </>
            </ProtectedRoute>
          }
        />

   <Route
   path="/resources"
   element = {
    <ProtectedRoute>
      <Resources/>
    </ProtectedRoute>
   }
/>

  <Route
  path="/pricing"
  element = {
    <ProtectedRoute>
      <Pricingg/>
    </ProtectedRoute>
  }
  />

   <Route
   path="/solutions"
   element = {
    <ProtectedRoute>
      <Solutions/>
    </ProtectedRoute>
   }

   />

  <Route
  path="/demands"
  element ={
    <ProtectedRoute>
      <Demands/>
    </ProtectedRoute>
  }
  />


</Routes>


  
   <Footer/>
   <ToastContainer
   position="top-right"
   autoClose = {2000}
   theme="dark"
   newestOnTop
   closeOnClick
   pauseOnHover
   />
  
    </HashRouter>
  )

}


export default App;














