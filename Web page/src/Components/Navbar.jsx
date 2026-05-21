import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

function Navbar({ isLoggedIn, userName, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const profileRef = useRef(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("currentUser");
      if (stored) setUser(JSON.parse(stored));
    } catch {
      setUser(null);
    }
  }, [isLoggedIn]);

  // Scroll-aware background blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    if (!showProfile) return;
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showProfile]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    toast.success("Logout Successfully!");
    onLogout();
    setShowProfile(false);
    setTimeout(() => navigate("/login"), 1500);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/pricing", label: "Pricing" },
    { to: "/solutions", label: "Solutions" },
    { to: "/demands", label: "Demands" },
    { to: "/resources", label: "Contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-sm"
          : "bg-white border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-slate-800 hidden sm:block">
              whitepace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
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
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-200"
                >
                  <FaUserCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-slate-700 hidden sm:block max-w-[100px] truncate">
                    {userName}
                  </span>
                </button>

                {/* Profile Dropdown */}
                <div
                  className={`absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all duration-200 origin-top-right z-50 ${
                    showProfile
                      ? "opacity-100 scale-100 translate-y-0 visible"
                      : "opacity-0 scale-95 -translate-y-1 invisible pointer-events-none"
                  }`}
                >
                  <div className="p-4 bg-blue-50/50 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <FaUserCircle className="w-10 h-10 text-blue-600 shrink-0" />
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-slate-900 truncate">
                          {user?.name || userName}
                        </h3>
                        <p className="text-xs text-slate-500 truncate">
                          {user?.email || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
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
                  className="px-5 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-sm shadow-blue-500/20"
                >
                  Try Free
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute left-0 right-0 bg-white border-b border-slate-200 shadow-lg transition-all duration-300 ease-out overflow-hidden ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 max-h-[500px] visible"
            : "opacity-0 -translate-y-2 max-h-0 invisible pointer-events-none"
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(link.to)
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {!isLoggedIn && (
            <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-center text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-semibold text-center bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Try Free
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;



