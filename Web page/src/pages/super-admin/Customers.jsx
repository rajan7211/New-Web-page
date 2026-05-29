import DashboardLayout from "../../components/DashboardLayout";
import { useLocation } from "react-router-dom";

const titles = {
  "/super-admin":           { title: "System Overview",   subtitle: "Platform health and user management" },
  "/super-admin/users":     { title: "All Users",         subtitle: "Search, sort and manage every account" },
  "/super-admin/admins":    { title: "Admins",            subtitle: "Admin accounts and permissions" },
  "/super-admin/customers": { title: "Customers",         subtitle: "All customer accounts" },
  "/super-admin/analytics": { title: "Analytics",         subtitle: "Platform usage and trends" },
  "/super-admin/settings":  { title: "Settings",          subtitle: "Global platform configuration" },
};

export default function SuperAdminLayout() {
  const { pathname } = useLocation();
  const { title, subtitle } = titles[pathname] || { title: "Super Admin", subtitle: "" };
  return <DashboardLayout title={title} subtitle={subtitle} />;
}

