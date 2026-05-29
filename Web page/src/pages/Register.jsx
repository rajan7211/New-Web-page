import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle, FiZap } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const passwordRules = [
  { label: "At least 6 characters",    test: (v) => v.length >= 6 },
  { label: "One uppercase letter",      test: (v) => /[A-Z]/.test(v) },
  { label: "One lowercase letter",      test: (v) => /[a-z]/.test(v) },
  { label: "One number or symbol",      test: (v) => /[\d!@#$%^&*]/.test(v) },
];

const schema = Yup.object({
  firstName: Yup.string().trim()
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name is too long")
    .matches(/^[a-zA-Z\s'-]+$/, "Only letters, spaces, hyphens and apostrophes allowed")
    .required("First name is required"),
  lastName: Yup.string().trim()
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name is too long")
    .matches(/^[a-zA-Z\s'-]+$/, "Only letters, spaces, hyphens and apostrophes allowed")
    .required("Last name is required"),
  email: Yup.string().trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[\d!@#$%^&*]/, "Must contain a number or symbol")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
  role: Yup.string()
    .oneOf(["Super Admin", "Admin", "Customer"], "Please select a valid role")
    .required("Role is required"),
});

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
      <FiAlertCircle className="w-3 h-3 shrink-0" />{msg}
    </p>
  );
}

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPw,   setShowPw]   = useState(false);
  const [showCPw,  setShowCPw]  = useState(false);
  const [loading,  setLoading]  = useState(false);

  const formik = useFormik({
    initialValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "", role: "Customer" },
    validationSchema: schema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await register(values);
        if (values.role === "Customer") {
          toast.success(`Welcome, ${values.firstName}!`);
          navigate("/", { replace: true });
        } else {
          toast.success("Account created! Please log in.");
          navigate("/login", { replace: true });
        }
      } catch (err) {
        toast.error(err?.message || "Registration failed. Please try again.");
        if (err?.message?.includes("email")) formik.setFieldError("email", err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const fe = (name) => formik.touched[name] && formik.errors[name];
  const fieldClass = (name) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none ${
      fe(name)
        ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
        : "border-slate-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
    }`;

  const pwStrength = passwordRules.filter((r) => r.test(formik.values.password)).length;
  const pwColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-emerald-500"];

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
            <FiZap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Create your account</h1>
          <p className="text-slate-500 mt-2">Join Whitepace and start collaborating.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 p-8">
          <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">

            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              {["firstName", "lastName"].map((name, i) => (
                <div key={name}>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {i === 0 ? "First name" : "Last name"}
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                    <input
                      id={name} name={name}
                      value={formik.values[name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder={i === 0 ? "John" : "Doe"}
                      autoComplete={i === 0 ? "given-name" : "family-name"}
                      className={fieldClass(name)}
                    />
                  </div>
                  <FieldError msg={fe(name)} />
                </div>
              ))}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                <input
                  id="email" name="email" type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={fieldClass("email")}
                />
                {formik.touched.email && !formik.errors.email && formik.values.email && (
                  <FiCheckCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500 w-4 h-4" />
                )}
              </div>
              <FieldError msg={fe("email")} />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                <input
                  id="password" name="password"
                  type={showPw ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  className={`${fieldClass("password")} pr-10`}
                />
                <button type="button" onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors">
                  {showPw ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength meter */}
              {formik.values.password && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex gap-1">
                    {[0,1,2,3].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < pwStrength ? pwColors[pwStrength - 1] : "bg-slate-200"}`} />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    {passwordRules.map((rule) => (
                      <div key={rule.label} className={`flex items-center gap-1 text-xs ${rule.test(formik.values.password) ? "text-emerald-600" : "text-slate-400"}`}>
                        <FiCheckCircle className="w-3 h-3 shrink-0" />
                        {rule.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <FieldError msg={fe("password")} />
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                <input
                  id="confirmPassword" name="confirmPassword"
                  type={showCPw ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  className={`${fieldClass("confirmPassword")} pr-10`}
                />
                <button type="button" onClick={() => setShowCPw((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors">
                  {showCPw ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              {formik.values.confirmPassword && !fe("confirmPassword") && (
                <p className="mt-1.5 text-xs text-emerald-600 flex items-center gap-1">
                  <FiCheckCircle className="w-3 h-3" /> Passwords match
                </p>
              )}
              <FieldError msg={fe("confirmPassword")} />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Account type</label>
              <div className="grid grid-cols-3 gap-2">
                {["Customer", "Admin", "Super Admin"].map((r) => (
                  <button
                    key={r} type="button"
                    onClick={() => formik.setFieldValue("role", r)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all
                      ${formik.values.role === r
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50/50"
                      }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <FieldError msg={fe("role")} />
            </div>

            <button
              type="submit"
              disabled={loading || !formik.isValid || !formik.dirty}
              className={`w-full py-3 rounded-xl text-sm font-bold transition-all shadow-sm mt-2
                ${loading || !formik.isValid || !formik.dirty
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 active:scale-[0.98]"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;









