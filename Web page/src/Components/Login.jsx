import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";


import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiAlertCircle,
  FiCheckCircle,
  FiCheck,
  FiLoader,
} from "react-icons/fi";

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginValidationSchema,

    validateOnBlur: true,
    validateOnChange: true,

    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        await new Promise((resolve) => 
          setTimeout(resolve, 1500));

        const user = {
          name: "John Doe",
          email: values.email,
        };

  // useAuth login

        onLogin(user);

        toast.success("Login successful!");

        navigate("/");
      } catch {
        toast.error("Login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });



  const isFormValid =
    formik.values.email &&
    formik.values.password &&
    Object.keys(formik.errors).length === 0;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 animate-scaleIn">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
              <FiLogIn className="w-8 h-8 text-brand-600" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>

              <div className="relative">
                <div className="absolute left-3.5 top-3.5">
                  {formik.touched.email && formik.errors.email ? (
                    <FiAlertCircle className="w-5 h-5 text-red-400" />
                  ) : formik.touched.email &&
                    !formik.errors.email &&
                    formik.values.email ? (
                    <FiCheck className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <FiMail className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`
                    w-full pl-11 pr-4 py-3.5
                    rounded-2xl border-2 bg-slate-50
                    text-sm text-slate-800
                    transition-all duration-300
                    focus:outline-none focus:bg-white
                    ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                        : formik.touched.email &&
                            !formik.errors.email &&
                            formik.values.email
                          ? "border-emerald-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                          : "border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10"
                    }
                  `}
                />
              </div>

               {/* Error Message  */}
              {formik.touched.email && formik.errors.email && (
                <div className="flex items-center gap-1.5 mt-1">
                  <FiAlertCircle className="w-3.5 h-3.5 text-red-400" />

                  <p className="text-xs font-medium text-red-500">
                    {formik.errors.email}
                  </p>
                </div>
              )}

              {/* Success Message */}
              {formik.touched.email &&
                !formik.errors.email &&
                formik.values.email && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <FiCheckCircle className="w-3.5 h-3.5 text-emerald-400" />

                    <p className="text-xs font-medium text-emerald-600">
                      done
                    </p>
                  </div>
                )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                {/* Left Icon */}
                <div className="absolute left-3.5 top-3.5">
                  {formik.touched.password && formik.errors.password ? (
                    <FiAlertCircle className="w-5 h-5 text-red-400" />
                  ) : formik.touched.password &&
                    !formik.errors.password &&
                    formik.values.password ? (
                    <FiCheck className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <FiLock className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`
                    w-full pl-11 pr-12 py-3.5
                    rounded-2xl border-2 bg-slate-50
                    text-sm text-slate-800
                    transition-all duration-300
                    focus:outline-none focus:bg-white
                    ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                        : formik.touched.password &&
                            !formik.errors.password &&
                            formik.values.password
                          ? "border-emerald-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                          : "border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10"
                    }
                  `}
                />

                 {/* Show/Hide Password  */}

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>

              </div>

              {/* Error Message */}
              {formik.touched.password && formik.errors.password && (
                <div className="flex items-center gap-1.5 mt-1">
                  <FiAlertCircle className="w-3.5 h-3.5 text-red-400" />

                  <p className="text-xs font-medium text-red-500">
                    {formik.errors.password}
                  </p>
                </div>
              )}

              {/* Success Message */}
              {formik.touched.password &&
                !formik.errors.password &&
                formik.values.password && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <FiCheckCircle className="w-3.5 h-3.5 text-emerald-400" />

                    <p className="text-xs font-medium text-emerald-600">
                     Done
                    </p>
                  </div>
                )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`
                w-full py-4 rounded-2xl
                font-bold text-sm
                transition-all duration-300
                flex items-center justify-center gap-2
                ${
                  isLoading
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : isFormValid
                      ? "bg-brand-600 text-white hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/25"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }
              `}
            >
              {isLoading ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <div className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>

            {/* Form Status */}
            <div className="flex items-center justify-center gap-2 text-xs">
              {isFormValid ? (
                <>
                  <FiCheckCircle className="w-4 h-4 text-emerald-400" />

                  <span className="text-emerald-600 font-medium">
                    All fields are ok
                  </span>
                </>
              ) : (
                <>
                  <FiAlertCircle className="w-4 h-4 text-amber-400" />

                  <span className="text-slate-500">
                    Complete all fields
                  </span>
                </>
              )}
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-brand-600 hover:text-brand-700"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

















