import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle, FiLoader, FiLogIn } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const loginValidationSchema = Yup.object({
  email: Yup.string().email("Please enter a valid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

function Login() {
  const { login, isAuthenticated, currentUser, getDashboardRoute } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const destination = getDashboardRoute(currentUser.role);
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, currentUser, getDashboardRoute, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const user = await login(values);
        
        if (!rememberMe) {
          localStorage.removeItem("rbac_is_logged_in");
        }
        
        toast.success(`Welcome back, ${user.firstName || user.name}!`, {
          position: "top-right",
          autoClose: 2000,
        });

        const destination = location.state?.from?.pathname || getDashboardRoute(user.role);
        navigate(destination, { replace: true });
      } catch (error) {
        toast.error(error?.message || "Invalid credentials. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
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
    <div className="min-h-[calc(100vh-84px)] bg-slate-100 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl rounded-[2.5rem] bg-white p-8 sm:p-12 shadow-2xl shadow-slate-200/70 border border-slate-100"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-600 text-white mb-6 shadow-lg shadow-blue-200">
            <FiLogIn className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
          <p className="mt-2 text-slate-500">Login to access your personalized dashboard.</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <FormField
            id="email"
            label="Email Address"
            type="email"
            icon={<FiMail />}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          
          <FormField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            icon={<FiLock />}
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            togglePassword={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              Remember me
            </label>
            <button type="button" className="text-sm font-bold text-blue-600 hover:text-blue-700">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold text-white transition-all shadow-lg ${
              isLoading || !isFormValid
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
            }`}
          >
            {isLoading ? (
              <><FiLoader className="h-5 w-5 animate-spin" /> Signing in...</>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs">
            {isFormValid ? (
              <>
                <FiCheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-600 font-medium">Valid credentials entered</span>
              </>
            ) : (
              <>
                <FiAlertCircle className="w-4 h-4 text-amber-400" />
                <span className="text-slate-500">Please enter your login details</span>
              </>
            )}
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function FormField({ id, label, type, icon, value, error, onChange, onBlur, togglePassword, showPassword }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-lg">
          {icon}
        </div>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full rounded-2xl border p-4 pl-12 text-sm text-slate-900 shadow-sm transition-all focus:outline-none focus:bg-white focus:ring-4 ${
            error 
            ? "border-red-300 bg-red-50 focus:ring-red-100" 
            : "border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-blue-100"
          }`}
        />
        {togglePassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-blue-600"
          >
            {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
}

export default Login;




