import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ImpersonationBanner from "./components/ImpersonationBanner"; // ← NEW

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <ImpersonationBanner />

        <Navbar />

        <Routes>
          {/* Protected Home Page */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/login"        element={<Login />} />
          <Route path="/register"     element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Super Admin Route */}
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute roles={["Super Admin"]}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Customer Route */}
          <Route
            path="/customer"
            element={
              <ProtectedRoute roles={["Customer"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="dark"
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </AuthProvider>
    </HashRouter>
  );
}

export default App;


