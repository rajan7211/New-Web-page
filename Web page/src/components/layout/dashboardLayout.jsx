import { useState, useMemo, useCallback } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  Bell, Home, Users, BarChart3, Settings,
  ShoppingBag, User, Menu, X, LogOut,
  ChevronRight, Search, Zap, PanelLeftClose, PanelLeft
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

const roleMenu = {
  "Super Admin": [
    { label: "Overview", path: "/super-admin", icon: Home },
    { label: "All Users", path: "/super-admin/users", icon: Users },
    { label: "Admins", path: "/super-admin/admins", icon: User },
    { label: "Customers", path: "/super-admin/customers", icon: ShoppingBag },
    { label: "Analytics", path: "/super-admin/analytics", icon: BarChart3 },
    { label: "Settings", path: "/super-admin/settings", icon: Settings },
  ],
  Admin: [
    { label: "Overview", path: "/admin", icon: Home },
    { label: "Customers", path: "/admin/customers", icon: Users },
    { label: "Reports", path: "/admin/reports", icon: BarChart3 },
    { label: "Settings", path: "/admin/settings", icon: Settings },
  ],
  Customer: [
    { label: "Overview", path: "/customer", icon: Home },
    { label: "My Profile", path: "/customer/profile", icon: User },
    { label: "My Orders", path: "/customer/orders", icon: ShoppingBag },
    { label: "Settings", path: "/customer/settings", icon: Settings },
  ],
};

const roleColors = {
  "Super Admin": {
    dot: "bg-violet-500",
    badge: "bg-violet-100 text-violet-700",
    avatar: "bg-gradient-to-br from-violet-500 to-purple-600",
  },
  Admin: {
    dot: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700",
    avatar: "bg-gradient-to-br from-blue-500 to-indigo-600",
  },
  Customer: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
    avatar: "bg-gradient-to-br from-emerald-400 to-teal-600",
  },
};

export default function DashboardLayout({ title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, isImpersonating } = useAuth();

  const menuItems = useMemo(() => roleMenu[currentUser?.role] || [], [currentUser?.role]);
  const colors = useMemo(() => roleColors[currentUser?.role] || roleColors.Customer, [currentUser?.role]);
  const initial = useMemo(() => currentUser?.name?.charAt(0)?.toUpperCase() || "U", [currentUser?.name]);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const isActive = useCallback(
    (path) => {
      if (path.split("/").length === 2) return location.pathname === path;
      return location.pathname === path || location.pathname.startsWith(path + "/");
    },
    [location.pathname]
  );

  return (
    <div className="flex min-h-screen bg-[#f8f9fc] font-sans">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-slate-100
          transition-all duration-300 ease-in-out shadow-xl lg:shadow-none lg:static
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${collapsed ? "lg:w-[72px]" : "w-64"}
        `}
      >
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-slate-100 ${collapsed ? "justify-center px-0" : ""}`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
            <Zap className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">Whitepace</p>
              <p className="text-sm font-semibold text-slate-800 truncate">{currentUser?.role} Portal</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5" aria-label="Sidebar navigation">
          {menuItems.map(({ label, path, icon: Icon }) => {
            const active = isActive(path);
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                title={collapsed ? label : undefined}
                className={`
                  group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150
                  ${active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }
                  ${collapsed ? "justify-center px-0" : ""}
                `}
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className={`shrink-0 w-[18px] h-[18px] ${active ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`}
                  aria-hidden="true"
                />
                {!collapsed && <span className="flex-1">{label}</span>}
                {!collapsed && active && <ChevronRight className="w-3.5 h-3.5 text-blue-200" aria-hidden="true" />}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setCollapsed((p) => !p)}
          className="hidden lg:flex items-center justify-center mx-3 mb-2 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeft className="w-4 h-4" /> : <><PanelLeftClose className="w-4 h-4 mr-1" /> Collapse</>}
        </button>

        <div className="border-t border-slate-100 p-3">
          {!collapsed && (
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 mb-2">
              <div className={`w-8 h-8 rounded-lg ${colors.avatar} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                {initial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{currentUser?.name}</p>
                <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${colors.badge} shrink-0`}>
                {currentUser?.role?.split(" ")[0]}
              </span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium
              text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <LogOut className="w-4 h-4 shrink-0" aria-hidden="true" />
            {!collapsed && (isImpersonating ? "Stop Impersonating" : "Logout")}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center justify-between px-6 py-3.5 gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-tight">{title}</h1>
                {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 w-52">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                <input
                  placeholder="Search..."
                  className="bg-transparent text-sm text-slate-600 placeholder:text-slate-400 outline-none w-full"
                  aria-label="Global search"
                />
              </div>

              <button
                className="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-[18px] h-[18px]" aria-hidden="true" />
                <span className="absolute right-2 top-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" aria-hidden="true" />
              </button>

              <div className={`w-8 h-8 rounded-xl ${colors.avatar} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                {initial}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

