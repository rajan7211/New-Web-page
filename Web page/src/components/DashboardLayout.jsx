import { useMemo, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiBell, FiHome, FiUsers, FiBarChart2, FiSettings, FiShoppingBag, FiUser, FiMenu, FiX, FiLogOut, FiChevronRight } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const roleMenu = {
  "Super Admin": [
    { label: "Dashboard", path: "/super-admin", icon: FiHome },
    { label: "All Users", path: "/super-admin/users", icon: FiUsers },
    { label: "Admins", path: "/super-admin/admins", icon: FiUser },
    { label: "Customers", path: "/super-admin/customers", icon: FiShoppingBag },
    { label: "Analytics", path: "/super-admin/analytics", icon: FiBarChart2 },
    { label: "Settings", path: "/super-admin/settings", icon: FiSettings },
  ],
  Admin: [
    { label: "Dashboard", path: "/admin", icon: FiHome },
    { label: "Customers", path: "/admin/customers", icon: FiUsers },
    { label: "Reports", path: "/admin/reports", icon: FiBarChart2 },
    { label: "Settings", path: "/admin/settings", icon: FiSettings },
  ],
  Customer: [
    { label: "Dashboard", path: "/customer", icon: FiHome },
    { label: "My Profile", path: "/customer/profile", icon: FiUser },
    { label: "My Orders", path: "/customer/orders", icon: FiShoppingBag },
    { label: "Settings", path: "/customer/settings", icon: FiSettings },
  ],
};

function DashboardLayout({ title, subtitle, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const menuItems = useMemo(
    () => roleMenu[currentUser?.role] || [],
    [currentUser?.role]
  );

  const activePath = location.pathname;

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const userInitial = useMemo(
    () => currentUser?.name?.charAt(0)?.toUpperCase() || "U",
    [currentUser?.name]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-gray-200 shadow-lg transition-transform duration-300 lg:static lg:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo Section */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Portal</p>
              <h1 className="mt-1 text-lg font-bold text-gray-900">{currentUser?.role || "Dashboard"}</h1>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            {menuItems.map(({ label, path, icon: Icon }) => {
              const isActive = activePath === path || activePath.startsWith(path + "/");
              return (
                <Link
                  key={label}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`group mb-1 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                    {label}
                  </div>
                  {isActive && <FiChevronRight className="h-4 w-4 text-blue-600" />}
                </Link>
              );
            })}
          </nav>

          {/* User Profile - Fixed at Bottom */}
          <div className="border-t border-gray-100 px-4 py-4">
            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                {userInitial}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-semibold text-gray-900">{currentUser?.name}</p>
                <p className="truncate text-xs text-gray-500">{currentUser?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <FiLogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64">
          {/* Top Header */}
          <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
                >
                  <FiMenu className="h-5 w-5" />
                </button>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                  <p className="text-sm text-gray-500">{subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="relative rounded-lg p-2.5 text-gray-600 hover:bg-gray-100">
                  <FiBell className="h-5 w-5" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                </button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;

