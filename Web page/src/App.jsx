import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ImpersonationBanner from "./components/ImpersonationBanner";
import Navbar from "./components/Navbar";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

// Super Admin
import SuperAdminLayout from "./pages/super-admin/SuperAdminLayout";
import SuperAdminDashboard from "./pages/super-admin/Dashboard";
import SuperAdminUsers from "./pages/super-admin/Users";
import SuperAdminAdmins from "./pages/super-admin/Admins";
import SuperAdminCustomers from "./pages/super-admin/Customers";
import SuperAdminAnalytics from "./pages/super-admin/Analytics";
import SuperAdminSettings from "./pages/super-admin/Settings";

// Admin
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCustomers from "./pages/admin/Customers";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";

// Customer
import CustomerLayout from "./pages/customer/CustomerLayout";
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerProfile from "./pages/customer/Profile";
import CustomerOrders from "./pages/customer/Orders";
import CustomerSettings from "./pages/customer/Settings";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
          <ImpersonationBanner />
          <Navbar />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Super Admin Nested Routes */}
            <Route
              path="/super-admin"
              element={
                <ProtectedRoute roles={["Super Admin"]}>
                  <SuperAdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<SuperAdminDashboard />} />
              <Route path="users" element={<SuperAdminUsers />} />
              <Route path="admins" element={<SuperAdminAdmins />} />
              <Route path="customers" element={<SuperAdminCustomers />} />
              <Route path="analytics" element={<SuperAdminAnalytics />} />
              <Route path="settings" element={<SuperAdminSettings />} />
            </Route>

            {/* Admin Nested Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["Admin"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Customer Nested Routes */}
            <Route
              path="/customer"
              element={
                <ProtectedRoute roles={["Customer"]}>
                  <CustomerLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<CustomerDashboard />} />
              <Route path="profile" element={<CustomerProfile />} />
              <Route path="orders" element={<CustomerOrders />} />
              <Route path="settings" element={<CustomerSettings />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            className="mt-16"
            toastClassName="rounded-2xl shadow-xl"
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;