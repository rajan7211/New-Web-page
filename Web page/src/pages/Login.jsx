import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { loginSchema } from "../utils/validationSchemas";

const DEMO_ACCOUNTS = [
  { role: "Super Admin", email: "superadmin@demo.com", password: "SuperAdmin123!" },
  { role: "Admin", email: "admin@demo.com", password: "AdminDemo123!" },
  { role: "Customer", email: "customer@demo.com", password: "Customer123!" },
];

export default function Login() {
  const { login, isAuthenticated, currentUser, getDashboardRoute } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      navigate(getDashboardRoute(currentUser.role), { replace: true });
    }
  }, [isAuthenticated, currentUser, getDashboardRoute, navigate]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const user = await login({ email: values.email.trim(), password: values.password });
        toast.success(`Welcome back, ${user.firstName || user.name}!`);
        const dest = location.state?.from?.pathname || getDashboardRoute(user.role);
        navigate(dest, { replace: true });
      } catch (err) {
        toast.error(err?.message || "Invalid email or password.");
        formik.setFieldError("password", "Invalid email or password");
      } finally {
        setLoading(false);
      }
    },
  });

  const fillDemo = useCallback((acc) => {
    formik.setValues({ email: acc.email, password: acc.password });
  }, [formik]);

  const fieldError = (name) => formik.touched[name] && formik.errors[name];

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="hidden lg:flex flex-col justify-between w-96 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%,#fff 1px,transparent 1px),radial-gradient(circle at 80% 20%,#fff 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg">Whitepace</span>
          </div>
          <h2 className="text-3xl font-bold text-white leading-snug">Your workspace,<br />your rules.</h2>
          <p className="text-blue-200 mt-4 text-sm leading-relaxed">Role-based access control that keeps every team member in the right place.</p>
        </div>

        <div className="relative space-y-3">
          <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">Demo accounts</p>
          {DEMO_ACCOUNTS.map((acc) => (
            <button
              key={acc.role}
              onClick={() => fillDemo(acc)}
              className="w-full text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
            >
              <p className="text-white text-sm font-semibold">{acc.role}</p>
              <p className="text-blue-200 text-xs mt-0.5">{acc.email}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
            <p className="text-slate-500 mt-2">Sign in to your account to continue.</p>
          </div>

          <div className="lg:hidden grid grid-cols-3 gap-2 mb-6">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.role}
                onClick={() => fillDemo(acc)}
                className="text-center px-2 py-2 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 text-xs font-medium text-slate-700 transition-colors"
              >
                {acc.role}
              </button>
            ))}
          </div>

          <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none ${
                    fieldError("email")
                      ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  }`}
                />
                {fieldError("email") && (
                  <AlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 text-red-400 w-4 h-4" />
                )}
              </div>
              {fieldError("email") && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />{formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</label>
                <button type="button" className="text-xs font-medium text-blue-600 hover:text-blue-700">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm transition-all outline-none ${
                    fieldError("password")
                      ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldError("password") && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />{formik.errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !formik.isValid || !formik.dirty}
              className={`w-full py-3 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                loading || !formik.isValid || !formik.dirty
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">Create one</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}











