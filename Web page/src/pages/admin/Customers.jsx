import DashboardLayout from "../../components/DashboardLayout";
import { useLocation } from "react-router-dom";

const titles = {
  "/admin":           { title: "Admin Dashboard", subtitle: "Customer management overview" },
  "/admin/customers": { title: "Customers",       subtitle: "Search, sort and manage your customers" },
  "/admin/reports":   { title: "Reports",         subtitle: "Activity and performance reports" },
  "/admin/settings":  { title: "Settings",        subtitle: "Your admin preferences" },
};

export default function AdminLayout() {
  const { pathname } = useLocation();
  const { title, subtitle } = titles[pathname] || { title: "Admin", subtitle: "" };
  return <DashboardLayout title={title} subtitle={subtitle} />;
}