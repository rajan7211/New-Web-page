import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle, FiLoader, FiLogIn } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import { loginValidationSchema } from "./utils/validationSchemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

function Login() {
  const { login, isAuthenticated, currentUser, getDashboardRoute } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      navigate(getDashboardRoute(currentUser.role), { replace: true });
    }
  }, [isAuthenticated, currentUser, getDashboardRoute, navigate]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const user = await login(values);
        if (!rememberMe) localStorage.removeItem("rbac_is_logged_in");
        toast.success(`Welcome back, ${user.firstName || user.name}!`);
        const destination = location.state?.from?.pathname || getDashboardRoute(user.role);
        navigate(destination, { replace: true });
      } catch (error) {
        toast.error(error?.message || "Invalid credentials.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const isFormValid =
    Boolean(formik.values.email) &&
    Boolean(formik.values.password) &&
    Object.keys(formik.errors).length === 0;

  return (
    <div className="min-h-[calc(100vh-84px)] bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-3xl border-white/40 shadow-2xl bg-white/80 backdrop-blur-2xl">
          <CardHeader className="text-center pb-4 pt-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center 
                rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-500/50"
            >
              <FiLogIn className="h-7 w-7" />
            </motion.div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription>Login to access your personalized dashboard</CardDescription>
          </CardHeader>

          <CardContent className="px-8">
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</Label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="you@example.com"
                    className={`pl-10 rounded-xl border transition-all
                      ${formik.touched.email && formik.errors.email
                        ? "border-red-300 bg-red-50 focus-visible:ring-red-200"
                        : "border-slate-200 bg-white/70 focus-visible:ring-blue-100"
                      }`}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-red-600 font-medium">{formik.errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</Label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="••••••••"
                    className={`pl-10 pr-10 rounded-xl border transition-all
                      ${formik.touched.password && formik.errors.password
                        ? "border-red-300 bg-red-50 focus-visible:ring-red-200"
                        : "border-slate-200 bg-white/70 focus-visible:ring-blue-100"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                  >
                    {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-xs text-red-600 font-medium">{formik.errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe((p) => !p)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600"
                  />
                  Remember me
                </label>
                <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full rounded-xl py-5 text-sm font-bold shadow-lg
                  ${isLoading || !isFormValid
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  }`}
              >
                {isLoading ? (
                  <>
                    <FiLoader className="h-4 w-4 animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs">
                {isFormValid ? (
                  <>
                    <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 font-medium">Valid credentials</span>
                  </>
                ) : (
                  <>
                    <FiAlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-slate-400">Enter your login details</span>
                  </>
                )}
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center pb-8 pt-2">
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700 underline">
                Create an account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default Login;









