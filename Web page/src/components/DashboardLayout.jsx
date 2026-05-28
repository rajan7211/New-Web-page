import { useState, useMemo, useCallback } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiBell, FiMenu, FiX, FiLogOut, FiChevronRight,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

const roleMenu = {
  "Super Admin": [
    { label: "Dashboard", path: "/super-admin", icon: "🏠" },
    { label: "All Users", path: "/super-admin/users", icon: "👥" },
    { label: "Admins", path: "/super-admin/admins", icon: "🛡️" },
    { label: "Customers", path: "/super-admin/customers", icon: "🛍️" },
    { label: "Analytics", path: "/super-admin/analytics", icon: "📊" },
    { label: "Settings", path: "/super-admin/settings", icon: "⚙️" },
  ],
  Admin: [
    { label: "Dashboard", path: "/admin", icon: "🏠" },
    { label: "Customers", path: "/admin/customers", icon: "👥" },
    { label: "Reports", path: "/admin/reports", icon: "📈" },
    { label: "Settings", path: "/admin/settings", icon: "⚙️" },
  ],
  Customer: [
    { label: "Dashboard", path: "/customer", icon: "🏠" },
    { label: "My Profile", path: "/customer/profile", icon: "👤" },
    { label: "My Orders", path: "/customer/orders", icon: "📦" },
    { label: "Settings", path: "/customer/settings", icon: "⚙️" },
  ],
};

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const menuItems = useMemo(
    () => roleMenu[currentUser?.role] || [],
    [currentUser?.role]
  );

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const userInitial = useMemo(
    () => currentUser?.name?.charAt(0)?.toUpperCase() || "U",
    [currentUser?.name]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="flex">
        <motion.aside
          initial={false}
          animate={{ x: mobileOpen ? 0 : "-100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed inset-y-0 left-0 z-50 w-72 flex flex-col 
            bg-white/80 backdrop-blur-2xl border-r border-white/20
            shadow-2xl shadow-indigo-500/10 lg:static lg:translate-x-0"
        >
        {/* Glassmorphic Sidebar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 
                rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/50
                transform hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600">
                  Portal
                </p>
                <h1 className="text-sm font-bold bg-gradient-to-r from-slate-900 to-slate-700 
                  bg-clip-text text-transparent leading-tight">
                  {currentUser?.role || "Dashboard"}
                </h1>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden h-9 w-9 rounded-xl hover:bg-white/50 transition-all"
            >
              <FiX className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2 scrollbar-thin scrollbar-thumb-slate-300">
            {menuItems.map(({ label, path, icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-medium
                      transition-all duration-300 relative overflow-hidden
                      ${isActive
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                        : "text-slate-700 hover:bg-white/70 hover:shadow-md"
                      }`}
                  >
                    <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                      {icon}
                    </span>
                    <span className="text-sm font-semibold">{label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute right-3"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <FiChevronRight className="h-4 w-4" />
                      </motion.div>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className="px-4 py-5 space-y-3 border-t border-white/30 bg-gradient-to-b from-transparent to-blue-50/50">
            <div className="flex items-center gap-3 rounded-2xl bg-white/70 backdrop-blur-sm 
              px-4 py-3 shadow-lg border border-white/50">
              <Avatar className="h-11 w-11 ring-2 ring-blue-500/30 ring-offset-2">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 
                  text-white text-sm font-bold">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {currentUser?.name}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {currentUser?.email}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full gap-2 rounded-xl border-red-200 bg-white/50 text-red-600 
                hover:bg-red-50 hover:border-red-300 transition-all shadow-sm
                hover:shadow-md transform hover:scale-[1.02]"
            >
              <FiLogOut className="h-4 w-4" />
              <span className="font-semibold">Logout</span>
            </Button>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Glassmorphic Header */}
          <header className="sticky top-0 z-30 border-b border-white/20 
            bg-white/60 backdrop-blur-xl shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden rounded-xl hover:bg-white/70 transition-all"
                >
                  <FiMenu className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-xl hover:bg-white/70 transition-all group"
                >
                  <FiBell className="h-5 w-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 
                    ring-2 ring-white animate-pulse" />
                </Button>
                <Badge
                  variant="secondary"
                  className="hidden sm:flex bg-gradient-to-r from-blue-50 to-indigo-50 
                    backdrop-blur-sm text-indigo-700 font-semibold px-4 py-1.5 shadow-sm
                    border border-indigo-100"
                >
                  {currentUser?.role}
                </Badge>
              </div>
            </div>
          </header>

          {/* Page Content - Outlet for Nested Routes */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;




