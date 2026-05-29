import { useState, useMemo, useCallback } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  FiBell, FiHome, FiUsers, FiBarChart2, FiSettings,
  FiShoppingBag, FiUser, FiMenu, FiX, FiLogOut,
  FiChevronRight, FiSearch, FiZap,
} from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const roleMenu = {
  "Super Admin": [
    { label: "Overview",   path: "/super-admin",           icon: FiHome },
    { label: "All Users",  path: "/super-admin/users",     icon: FiUsers },
    { label: "Admins",     path: "/super-admin/admins",    icon: FiUser },
    { label: "Customers",  path: "/super-admin/customers", icon: FiShoppingBag },
    { label: "Analytics",  path: "/super-admin/analytics", icon: FiBarChart2 },
    { label: "Settings",   path: "/super-admin/settings",  icon: FiSettings },
  ],
  Admin: [
    { label: "Overview",  path: "/admin",           icon: FiHome },
    { label: "Customers", path: "/admin/customers", icon: FiUsers },
    { label: "Reports",   path: "/admin/reports",   icon: FiBarChart2 },
    { label: "Settings",  path: "/admin/settings",  icon: FiSettings },
  ],
  Customer: [
    { label: "Overview",   path: "/customer",          icon: FiHome },
    { label: "My Profile", path: "/customer/profile",  icon: FiUser },
    { label: "My Orders",  path: "/customer/orders",   icon: FiShoppingBag },
    { label: "Settings",   path: "/customer/settings", icon: FiSettings },
  ],
};

const roleColors = {
  "Super Admin": { dot: "bg-violet-500", badge: "bg-violet-100 text-violet-700", avatar: "bg-gradient-to-br from-violet-500 to-purple-600" },
  Admin:         { dot: "bg-blue-500",   badge: "bg-blue-100 text-blue-700",     avatar: "bg-gradient-to-br from-blue-500 to-indigo-600" },
  Customer:      { dot: "bg-emerald-500",badge: "bg-emerald-100 text-emerald-700",avatar: "bg-gradient-to-br from-emerald-400 to-teal-600" },
};

function DashboardLayout({ title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed,   setCollapsed]   = useState(false);
  const location   = useLocation();
  const navigate   = useNavigate();
  const { currentUser, logout, isImpersonating } = useAuth();

  const menuItems = useMemo(() => roleMenu[currentUser?.role] || [], [currentUser?.role]);
  const colors    = useMemo(() => roleColors[currentUser?.role] || roleColors.Customer, [currentUser?.role]);
  const initial   = useMemo(() => currentUser?.name?.charAt(0)?.toUpperCase() || "U", [currentUser?.name]);

  const handleLogout = useCallback(() => { logout(); navigate("/login"); }, [logout, navigate]);

  const isActive = (path) => {
    if (path.split("/").length === 2) return location.pathname === path;
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fc] font-sans">

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ══════ SIDEBAR ══════ */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-slate-100
          transition-all duration-300 ease-in-out shadow-xl lg:shadow-none lg:static
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${collapsed ? "lg:w-[72px]" : "w-64"}
        `}
      >
        {/* Brand */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-slate-100 ${collapsed ? "justify-center px-0" : ""}`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
            <FiZap className="w-4 h-4 text-white" />
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
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
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
              >
                <Icon className={`shrink-0 w-4.5 h-4.5 ${active ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`} style={{ width: 18, height: 18 }} />
                {!collapsed && <span className="flex-1">{label}</span>}
                {!collapsed && active && <FiChevronRight className="w-3.5 h-3.5 text-blue-200" />}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle (desktop) */}
        <button
          onClick={() => setCollapsed((p) => !p)}
          className="hidden lg:flex items-center justify-center mx-3 mb-2 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          {collapsed ? "→" : "← Collapse"}
        </button>

        <div className="border-t border-slate-100 p-3">
          {/* User card */}
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
            <FiLogOut className="w-4 h-4 shrink-0" />
            {!collapsed && (isImpersonating ? "Stop Impersonating" : "Logout")}
          </button>
        </div>
      </aside>

      {/* ══════ MAIN AREA ══════ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center justify-between px-6 py-3.5 gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <FiMenu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-tight">{title}</h1>
                {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Search bar */}
              <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 w-52">
                <FiSearch className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  placeholder="Search..."
                  className="bg-transparent text-sm text-slate-600 placeholder:text-slate-400 outline-none w-full"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
                <FiBell className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                <span className="absolute right-2 top-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>

              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl ${colors.avatar} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                {initial}
              </div>
            </div>
          </div>
        </header>

        {/* Page content via Outlet */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;






