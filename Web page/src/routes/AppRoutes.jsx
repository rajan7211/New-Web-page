import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import ImpersonationBanner from "../components/ImpersonationBanner";
import Navbar from "../components/Navbar";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";


import SuperAdminLayout from "../pages/super-admin/SuperAdminLayout";
import SuperAdminDashboard from "../pages/super-admin/Dashboard";
import SuperAdminUsers from "../pages/super-admin/Users";
import SuperAdminAdmins from "../pages/super-admin/Admins";
import SuperAdminCustomers from "../pages/super-admin/Customers";
import SuperAdminAnalytics from "../pages/super-admin/Analytics";
import SuperAdminSettings from "../pages/super-admin/Settings";

import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminCustomers from "../pages/admin/Customers";
import AdminReports from "../pages/admin/Reports";
import AdminSettings from "../pages/admin/Settings";


import CustomerLayout from "../pages/customer/CustomerLayout";
import CustomerDashboard from "../pages/customer/Dashboard";
import CustomerProfile from "../pages/customer/Profile";
import CustomerOrders from "../pages/customer/Orders";
import CustomerSettings from "../pages/customer/Settings";

function AppRoutes() {
  return (
    <>
      <ImpersonationBanner />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

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
    </>
  );
}

export default AppRoutes;






