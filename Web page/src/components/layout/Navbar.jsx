import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu, X, ShoppingCart, User, Package, Settings, LogOut } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import useAuth from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);
  const { isAuthenticated, currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = useCallback(() => {
    toast.success("Logout successful!");
    logout();
    setShowProfile(false);
    navigate("/", { replace: true });
  }, [logout, navigate]);

  const publicLinks = [{ to: "/", label: "Home" }];

  const roleLinks = {
    "Super Admin": [
      { to: "/super-admin", label: "Dashboard" },
      { to: "/super-admin/users", label: "Users" },
      { to: "/super-admin/analytics", label: "Analytics" },
    ],
    Admin: [
      { to: "/admin", label: "Dashboard" },
      { to: "/admin/customers", label: "Customers" },
      { to: "/admin/reports", label: "Reports" },
    ],
    Customer: [
      { to: "/", label: "Home" },
      { to: "/customer", label: "My Dashboard" },
    ],
  };

  const navLinks = isAuthenticated && currentUser
    ? roleLinks[currentUser.role] || publicLinks
    : [...publicLinks, { to: "/register", label: "Register" }, { to: "/login", label: "Login" }];

  const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

  const userInitial = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-slate-200/50 shadow-sm"
          : "bg-white border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-slate-800 hidden sm:block">whitepace</span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={`${link.to}-${link.label}`}>
                <Button
                  asChild
                  variant={isActive(link.to) ? "secondary" : "ghost"}
                  size="sm"
                  className={isActive(link.to) ? "text-blue-700 bg-blue-50 hover:bg-blue-100" : "text-slate-500"}
                >
                  <Link to={link.to}>{link.label}</Link>
                </Button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {currentUser?.role === "Customer" && (
                  <Button asChild variant="ghost" size="icon" className="relative hidden sm:flex">
                    <Link to="/cart" aria-label="Shopping cart">
                      <ShoppingCart className="w-5 h-5 text-slate-600" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                        0
                      </span>
                    </Link>
                  </Button>
                )}

                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setShowProfile((prev) => !prev)}
                    className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-200 border border-slate-200"
                    aria-expanded={showProfile}
                    aria-haspopup="menu"
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-blue-600 text-white text-xs font-semibold">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-slate-700 hidden sm:block max-w-[120px] truncate">
                      {currentUser?.firstName || currentUser?.name}
                    </span>
                  </button>

                  <AnimatePresence>
                    {showProfile && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden z-50"
                        role="menu"
                      >
                        <div className="p-4 bg-slate-50/80 border-b border-slate-100">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-blue-600 text-white font-semibold">
                                {userInitial}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <h3 className="text-sm font-semibold text-slate-900 truncate">{currentUser?.name}</h3>
                              <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
                              <Badge variant="secondary" className="mt-1 text-[10px] px-1.5 py-0 bg-blue-100 text-blue-700 hover:bg-blue-100">
                                {currentUser?.role}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="p-2">
                          {currentUser?.role === "Customer" && (
                            <>
                              <Button asChild variant="ghost" className="w-full justify-start gap-3 text-slate-700 font-medium" size="sm">
                                <Link to="/customer" onClick={() => setShowProfile(false)} role="menuitem">
                                  <User className="w-4 h-4" /> My Profile
                                </Link>
                              </Button>
                              <Button asChild variant="ghost" className="w-full justify-start gap-3 text-slate-700 font-medium" size="sm">
                                <Link to="/customer/orders" onClick={() => setShowProfile(false)} role="menuitem">
                                  <Package className="w-4 h-4" /> My Orders
                                </Link>
                              </Button>
                              <Button asChild variant="ghost" className="w-full justify-start gap-3 text-slate-700 font-medium" size="sm">
                                <Link to="/customer/settings" onClick={() => setShowProfile(false)} role="menuitem">
                                  <Settings className="w-4 h-4" /> Settings
                                </Link>
                              </Button>
                              <Separator className="my-1" />
                            </>
                          )}
                          <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700 font-medium"
                            size="sm"
                            role="menuitem"
                          >
                            <LogOut className="w-4 h-4" /> Logout
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="ghost" size="sm" className="text-slate-600">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20">
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden absolute left-0 right-0 bg-white border-b border-slate-200 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Button
                  key={`${link.to}-${link.label}-mobile`}
                  asChild
                  variant={isActive(link.to) ? "secondary" : "ghost"}
                  className={`w-full justify-start ${isActive(link.to) ? "text-blue-700 bg-blue-50" : "text-slate-600"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link to={link.to}>{link.label}</Link>
                </Button>
              ))}

              {!isAuthenticated && (
                <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
                  <Button asChild variant="outline" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/register">Get Started</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}


