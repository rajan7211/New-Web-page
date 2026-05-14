import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

function Navbar({ isLoggedIn, userName, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  // Close modals on outside click
  useEffect(() => {
    const closeProfile = () => setShowProfile(false);
    window.addEventListener("click", closeProfile);
    return () => window.removeEventListener("click", closeProfile);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    toast.success("Logout Successfully!");
    onLogout();
    setTimeout(() => navigate("/login"), 2000);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/resources", label: "Resources" },
    { to: "/pricing", label: "Pricing" },
    { to: "/solutions", label: "Solutions" },
    { to: "/demands", label: "Demands" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-slate-900">whitepace</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative">
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfile(!showProfile);
                  }}
                >
                  <FaUserCircle className="w-5 h-5 text-brand-600" />
                  <span className="text-sm font-medium text-slate-700 hidden sm:block">
                    {userName}
                  </span>
                </div>

                {/* Profile Dropdown */}
                {showProfile && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden animate-scaleIn origin-top-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-4 bg-brand-50/50">
                      <div className="flex items-center gap-3">
                        <FaUserCircle className="w-10 h-10 text-brand-600" />
                        <div>
                          <h3 className="font-semibold text-slate-900 text-sm">
                            {user?.name || userName}
                          </h3>
                          <p className="text-xs text-slate-500">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-semibold bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-all duration-200 shadow-md hover:shadow-lg shadow-brand-500/20"
                >
                  Try Free
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
            >
              {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fadeInUp">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(link.to)
                        ? "bg-brand-50 text-brand-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {!isLoggedIn && (
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-slate-100">
                <Link
                  to="/login"
                  className="px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-3 text-sm font-semibold bg-brand-600 text-white rounded-xl text-center"
                >
                  Try Free
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
