import DashboardLayout from "../../components/DashboardLayout";
import { useLocation } from "react-router-dom";

const titles = {
  "/customer":          { title: "My Dashboard",  subtitle: "Your account overview and recent activity" },
  "/customer/profile":  { title: "My Profile",    subtitle: "Your personal information" },
  "/customer/orders":   { title: "My Orders",     subtitle: "Track and search your order history" },
  "/customer/settings": { title: "Settings",      subtitle: "Manage your preferences" },
};

export default function CustomerLayout() {
  const { pathname } = useLocation();
  const { title, subtitle } = titles[pathname] || { title: "Dashboard", subtitle: "" };
  return <DashboardLayout title={title} subtitle={subtitle} />;
}