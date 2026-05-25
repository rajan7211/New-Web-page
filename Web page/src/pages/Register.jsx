import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiLoader, FiCheckCircle } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const registerValidationSchema = Yup.object({
  firstName: Yup.string().trim().min(2, "First name must be at least 2 characters").required("First name is required"),
  lastName: Yup.string().trim().min(2, "Last name must be at least 2 characters").required("Last name is required"),
  email: Yup.string().email("Please enter a valid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm your password"),
  role: Yup.string().oneOf(["Super Admin", "Admin", "Customer"], "Select a valid role").required("Select a role"),
});

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Customer",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await register(values);
        
        if (values.role === "Customer") {
          toast.success(`Welcome ${values.firstName}!`, { position: "top-right" });
          setTimeout(() => {
            navigate("/", { replace: true });
            window.location.reload(); 
          }, 500);
        } else {
          toast.success("Registration successful! Please login.", { position: "top-right" });
          navigate("/login", { replace: true });
        }
      } catch (error) {
        toast.error(error?.message || "Registration failed.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const isFormValid =
    formik.values.firstName &&
    formik.values.lastName &&
    formik.values.email &&
    formik.values.password &&
    formik.values.confirmPassword &&
    formik.values.role &&
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
            <FiUser className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
          <p className="mt-2 text-slate-500">Join Whitepace today and start your journey.</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="firstName"
              label="First name"
              icon={<FiUser />}
              value={formik.values.firstName}
              error={formik.touched.firstName && formik.errors.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextField
              id="lastName"
              label="Last name"
              icon={<FiUser />}
              value={formik.values.lastName}
              error={formik.touched.lastName && formik.errors.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <TextField
            id="email"
            label="Email Address"
            type="email"
            icon={<FiMail />}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <TextField
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

          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            icon={<FiLock />}
            value={formik.values.confirmPassword}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            showPassword={showConfirmPassword}
          />

          <div>
            <label htmlFor="role" className="mb-2 block text-sm font-semibold text-slate-700">Select User Role</label>
            <select
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
            >
              <option value="Customer">Customer (User)</option>
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <p className="mt-2 text-sm text-red-600">{formik.errors.role}</p>
            )}
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
              <><FiLoader className="h-5 w-5 animate-spin" /> Processing...</>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function TextField({ id, label, type = "text", icon, value, error, onChange, onBlur, togglePassword, showPassword }) {
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

export default Register;


