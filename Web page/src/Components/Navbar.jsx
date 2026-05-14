import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar({ isLoggedIn, userName, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  // Debug: Check state
  useEffect(() => {
    console.log("Mobile Menu Open:", mobileMenuOpen);
  }, [mobileMenuOpen]);

  // Close dropdown on outside click
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

  const toggleMobileMenu = () => {
    console.log("Toggling menu from:", mobileMenuOpen);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    console.log("Closing menu");
    setMobileMenuOpen(false);
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
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <span className="navbar-logo-text-icon">W</span>
          </div>
          <span className="navbar-logo-text">whitepace</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-menu">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`navbar-link ${isActive(link.to) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="navbar-right">
          {isLoggedIn ? (
            <div className="navbar-profile"
              onClick={(e) => {
                e.stopPropagation();
                setShowProfile(!showProfile);
              }}
            >
              <FaUserCircle className="navbar-profile-icon" />
              <span className="navbar-profile-name">{userName}</span>

              {showProfile && (
                <div
                  className="navbar-profile-dropdown"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="navbar-dropdown-header">
                    <div className="navbar-dropdown-info">
                      <FaUserCircle className="navbar-dropdown-avatar" />
                      <div>
                        <h3 className="navbar-dropdown-name">
                          {user?.name || userName}
                        </h3>
                        <p className="navbar-dropdown-email">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="navbar-dropdown-body">
                    <button onClick={handleLogout} className="navbar-logout-btn">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar-auth-links">
              <Link to="/login" className="navbar-login-link">Login</Link>
              <Link to="/register" className="navbar-register-link">Try Free</Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="navbar-mobile-btn"
            onClick={toggleMobileMenu}
            type="button"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="navbar-mobile-icon" />
            ) : (
              <FaBars className="navbar-mobile-icon" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Conditional Rendering */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu navbar-mobile-menu-open">
          <ul className="navbar-mobile-list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`navbar-mobile-link ${isActive(link.to) ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {!isLoggedIn && (
            <div className="navbar-mobile-auth">
              <Link 
                to="/login" 
                className="navbar-mobile-login"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="navbar-mobile-register"
                onClick={closeMobileMenu}
              >
                Try Free
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;





















