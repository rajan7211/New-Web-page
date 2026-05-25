import { useMemo, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiBell, FiHome, FiUsers, FiBarChart2, FiSettings,
  FiShoppingBag, FiUser, FiMenu, FiX, FiLogOut, FiChevronRight,
} from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const roleMenu = {
  "Super Admin": [
    { label: "Dashboard",  path: "/super-admin",           icon: FiHome },
    { label: "All Users",  path: "/super-admin/users",     icon: FiUsers },
    { label: "Admins",     path: "/super-admin/admins",    icon: FiUser },
    { label: "Customers",  path: "/super-admin/customers", icon: FiShoppingBag },
    { label: "Analytics",  path: "/super-admin/analytics", icon: FiBarChart2 },
    { label: "Settings",   path: "/super-admin/settings",  icon: FiSettings },
  ],
  Admin: [
    { label: "Dashboard", path: "/admin",           icon: FiHome },
    { label: "Customers", path: "/admin/customers", icon: FiUsers },
    { label: "Reports",   path: "/admin/reports",   icon: FiBarChart2 },
    { label: "Settings",  path: "/admin/settings",  icon: FiSettings },
  ],
  Customer: [
    { label: "Dashboard", path: "/customer",          icon: FiHome },
    { label: "My Profile",path: "/customer/profile",  icon: FiUser },
    { label: "My Orders", path: "/customer/orders",   icon: FiShoppingBag },
    { label: "Settings",  path: "/customer/settings", icon: FiSettings },
  ],
};

function DashboardLayout({ title, subtitle, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location   = useLocation();
  const navigate   = useNavigate();
  const { currentUser, logout } = useAuth();

  const menuItems = useMemo(
    () => roleMenu[currentUser?.role] || [],
    [currentUser?.role]
  );

  const activePath  = location.pathname;

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const userInitial = useMemo(
    () => currentUser?.name?.charAt(0)?.toUpperCase() || "U",
    [currentUser?.name]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex">
        {/* ── Sidebar ── */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-white border-r border-slate-200 shadow-xl
            transition-transform duration-300 lg:static lg:translate-x-0
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Logo */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Portal</p>
                <h1 className="text-sm font-bold text-slate-900 leading-tight">{currentUser?.role || "Dashboard"}</h1>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden h-8 w-8"
            >
              <FiX className="h-4 w-4" />
            </Button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
            {menuItems.map(({ label, path, icon: Icon }) => {
              const isActive = activePath === path || activePath.startsWith(path + "/");
              return (
                <Link
                  key={label}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all
                    ${isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                    {label}
                  </div>
                  {isActive && <FiChevronRight className="h-3.5 w-3.5 text-blue-500" />}
                </Link>
              );
            })}
          </nav>

          <Separator />

          {/* User section */}
          <div className="px-3 py-4 space-y-3">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-blue-600 text-white text-sm font-semibold">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{currentUser?.name}</p>
                <p className="truncate text-xs text-slate-500">{currentUser?.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full gap-2 text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
            >
              <FiLogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* ── Main ── */}
        <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
          {/* Header */}
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden"
                >
                  <FiMenu className="h-5 w-5" />
                </Button>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                  {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                  <FiBell className="h-5 w-5 text-slate-600" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                </Button>
                <Badge variant="secondary" className="hidden sm:flex">
                  {currentUser?.role}
                </Badge>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;





