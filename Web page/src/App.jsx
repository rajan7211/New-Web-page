import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ImpersonationBanner from "./components/ImpersonationBanner";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// Super Admin nested pages
import SuperAdminLayout from "./pages/superadmin/SuperAdminlayout";
import SuperAdminDashboard from "./pages/superadmin/SuperAdmindashboard";
import SuperAdminUsers from "./pages/superadmin/SuperAdminusers";
import SuperAdminAdmins from "./pages/superadmin/SuperAdminadmins";
import SuperAdminCustomers from "./pages/superadmin/SuperAdmincustomers";
import SuperAdminAnalytics from "./pages/superadmin/SuperAdminanalytics";
import SuperAdminSettings from "./pages/superadmin/SuperAdminsettings";

// Admin nested pages
import AdminLayout from "./pages/admin/Adminlayout";
import AdminDashboard from "./pages/admin/Admindashboard";
import AdminCustomers from "./pages/admin/Admincustomers";
import AdminReports from "./pages/admin/Adminreports";
import AdminSettings from "./pages/admin/Adminsettings";

// Customer nested pages
import CustomerLayout from "./pages/customer/Customerlayout";
import CustomerDashboard from "./pages/customer/Customerdashboard";
import CustomerProfile from "./pages/customer/Customerprofile";
import CustomerOrders from "./pages/customer/Customerorders";
import CustomerSettings from "./pages/customer/Customersettings";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <ImpersonationBanner />
        <Navbar />

        <Routes>
          <Route path="/login"        element={<Login />} />
          <Route path="/register"     element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/"             element={<ProtectedRoute><Home /></ProtectedRoute>} />

          {/* ── Super Admin ── */}
          <Route
            path="/super-admin"
            element={<ProtectedRoute roles={["Super Admin"]}><SuperAdminLayout /></ProtectedRoute>}
          >
            <Route index          element={<SuperAdminDashboard />} />
            <Route path="users"     element={<SuperAdminUsers />} />
            <Route path="admins"    element={<SuperAdminAdmins />} />
            <Route path="customers" element={<SuperAdminCustomers />} />
            <Route path="analytics" element={<SuperAdminAnalytics />} />
            <Route path="settings"  element={<SuperAdminSettings />} />
          </Route>

          {/* ── Admin ── */}
          <Route
            path="/admin"
            element={<ProtectedRoute roles={["Admin"]}><AdminLayout /></ProtectedRoute>}
          >
            <Route index          element={<AdminDashboard />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="reports"   element={<AdminReports />} />
            <Route path="settings"  element={<AdminSettings />} />
          </Route>

          {/* ── Customer ── */}
          <Route
            path="/customer"
            element={<ProtectedRoute roles={["Customer"]}><CustomerLayout /></ProtectedRoute>}
          >
            <Route index        element={<CustomerDashboard />} />
            <Route path="profile"  element={<CustomerProfile />} />
            <Route path="orders"   element={<CustomerOrders />} />
            <Route path="settings" element={<CustomerSettings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />

        <ToastContainer position="top-right" autoClose={2500} theme="dark" newestOnTop closeOnClick pauseOnHover />
      </AuthProvider>
    </HashRouter>
  );
}

export default App;