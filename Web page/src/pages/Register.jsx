import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiLoader,
  FiCheck, FiX, FiAlertCircle, FiCheckCircle, FiShield,
} from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import { registerValidationSchema } from "./utils/validationSchemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Register() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
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
      termsAccepted: false,
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await registerUser(values);
        if (values.role === "Customer") {
          toast.success(`🎉 Welcome ${values.firstName}! Your account has been created.`, {
            autoClose: 2500,
          });
          setTimeout(() => {
            navigate("/", { replace: true });
            window.location.reload();
          }, 500);
        } else {
          toast.success("Registration successful! Please login to continue.", {
            autoClose: 3000,
          });
          navigate("/login", { replace: true });
        }
      } catch (error) {
        toast.error(error?.message || "Registration failed. Please try again.", {
          autoClose: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const getPasswordStrength = (password) => {
    if (!password) return null;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&#]/.test(password)) strength++;

    const levels = [
      { label: "Weak", color: "text-red-600", bg: "bg-red-100", progress: "bg-red-500" },
      { label: "Fair", color: "text-amber-600", bg: "bg-amber-100", progress: "bg-amber-500" },
      { label: "Good", color: "text-blue-600", bg: "bg-blue-100", progress: "bg-blue-500" },
      { label: "Strong", color: "text-green-600", bg: "bg-green-100", progress: "bg-green-500" },
    ];

    return { ...levels[strength - 1] || levels[0], strength };
  };

  const passwordStrength = getPasswordStrength(formik.values.password);

  const isFormValid =
    Object.keys(formik.errors).length === 0 &&
    formik.values.firstName &&
    formik.values.lastName &&
    formik.values.email &&
    formik.values.password &&
    formik.values.confirmPassword &&
    formik.values.termsAccepted;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 
      flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-2xl"
      >
        <Card className="rounded-3xl border-white/40 shadow-2xl bg-white/80 backdrop-blur-2xl 
          overflow-hidden">
          <CardHeader className="text-center pb-6 pt-10 bg-gradient-to-b from-blue-50/50 to-transparent">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center 
                rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 
                text-white shadow-2xl shadow-blue-500/50"
            >
              <FiUser className="h-10 w-10" />
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
              bg-clip-text text-transparent">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Join Whitepace and unlock premium features
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 py-6">
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* Name Fields */}
              <div className="grid gap-5 sm:grid-cols-2">
                <FieldWrapper
                  id="firstName"
                  label="First Name"
                  error={formik.touched.firstName && formik.errors.firstName}
                  touched={formik.touched.firstName}
                  value={formik.values.firstName}
                >
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="John"
                    className={getInputClass(
                      formik.touched.firstName,
                      formik.errors.firstName,
                      formik.values.firstName
                    )}
                  />
                </FieldWrapper>

                <FieldWrapper
                  id="lastName"
                  label="Last Name"
                  error={formik.touched.lastName && formik.errors.lastName}
                  touched={formik.touched.lastName}
                  value={formik.values.lastName}
                >
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Doe"
                    className={getInputClass(
                      formik.touched.lastName,
                      formik.errors.lastName,
                      formik.values.lastName
                    )}
                  />
                </FieldWrapper>
              </div>

              {/* Email */}
              <FieldWrapper
                id="email"
                label="Email Address"
                error={formik.touched.email && formik.errors.email}
                touched={formik.touched.email}
                value={formik.values.email}
              >
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="you@example.com"
                  className={getInputClass(
                    formik.touched.email,
                    formik.errors.email,
                    formik.values.email
                  )}
                />
              </FieldWrapper>

              {/* Password with Strength Indicator */}
              <div className="space-y-2 relative">
                <FieldWrapper
                  id="password"
                  label="Password"
                  error={formik.touched.password && formik.errors.password}
                  touched={formik.touched.password}
                  value={formik.values.password}
                >
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 z-10" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="••••••••"
                    className={`${getInputClass(
                      formik.touched.password,
                      formik.errors.password,
                      formik.values.password
                    )} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 
                      hover:text-blue-600 transition-colors z-10"
                  >
                    {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                </FieldWrapper>
                
                {/* Password Strength Bar */}
                <AnimatePresence>
                  {passwordStrength && formik.values.password && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(passwordStrength.strength / 4) * 100}%`,
                            }}
                            className={`h-full ${passwordStrength.progress} transition-all duration-500`}
                          />
                        </div>
                        <span className={`text-xs font-bold ${passwordStrength.color}`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      
                      {/* Password Requirements */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <RequirementItem 
                          met={formik.values.password.length >= 8}
                          text="8+ characters"
                        />
                        <RequirementItem 
                          met={/[A-Z]/.test(formik.values.password)}
                          text="Uppercase letter"
                        />
                        <RequirementItem 
                          met={/[a-z]/.test(formik.values.password)}
                          text="Lowercase letter"
                        />
                        <RequirementItem 
                          met={/\d/.test(formik.values.password)}
                          text="Number"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Confirm Password */}
              <FieldWrapper
                id="confirmPassword"
                label="Confirm Password"
                error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                touched={formik.touched.confirmPassword}
                value={formik.values.confirmPassword}
              >
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  className={`${getInputClass(
                    formik.touched.confirmPassword,
                    formik.errors.confirmPassword,
                    formik.values.confirmPassword
                  )} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 
                    hover:text-blue-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="h-4 w-4" />
                  ) : (
                    <FiEye className="h-4 w-4" />
                  )}
                </button>
              </FieldWrapper>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <FiShield className="h-4 w-4 text-blue-600" />
                  Select User Role
                </Label>
                <Select
                  value={formik.values.role}
                  onValueChange={(val) => formik.setFieldValue("role", val)}
                >
                  <SelectTrigger className="rounded-2xl border-slate-200 bg-white/70 backdrop-blur-sm 
                    focus:ring-blue-500/20 h-12 hover:border-blue-300 transition-all">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="Customer" className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span>👤</span>
                        <span>Customer (User)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Admin" className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span>🛡️</span>
                        <span>Admin</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Super Admin" className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span>👑</span>
                        <span>Super Admin</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Terms & Conditions */}
              <div className="rounded-2xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-4 
                border border-blue-100">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="termsAccepted"
                    checked={formik.values.termsAccepted}
                    onCheckedChange={(checked) =>
                      formik.setFieldValue("termsAccepted", checked)
                    }
                    className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="termsAccepted"
                      className="text-sm font-medium text-slate-700 cursor-pointer leading-relaxed"
                    >
                      I accept the{" "}
                      <Link 
                        to="/terms" 
                        className="text-blue-600 hover:text-blue-700 font-semibold underline 
                          decoration-blue-400 underline-offset-2"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link 
                        to="/privacy" 
                        className="text-blue-600 hover:text-blue-700 font-semibold underline 
                          decoration-blue-400 underline-offset-2"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                    {formik.touched.termsAccepted && formik.errors.termsAccepted && (
                      <p className="text-xs text-red-600 font-medium mt-2 flex items-center gap-1">
                        <FiAlertCircle className="h-3 w-3" />
                        {formik.errors.termsAccepted}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full rounded-2xl py-6 text-base font-bold shadow-2xl transition-all 
                  transform hover:scale-[1.02] active:scale-[0.98]
                  ${
                    isLoading || !isFormValid
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                      : "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700 text-white shadow-blue-500/40"
                  }`}
              >
                {isLoading ? (
                  <>
                    <FiLoader className="h-5 w-5 animate-spin mr-2" />
                    Creating Your Account...
                  </>
                ) : (
                  <>
                    <FiCheck className="h-5 w-5 mr-2" />
                    Create Account
                  </>
                )}
              </Button>

              {/* Form Status */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2 text-sm"
              >
                {isFormValid ? (
                  <>
                    <FiCheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-semibold">All fields are valid ✓</span>
                  </>
                ) : (
                  <>
                    <FiAlertCircle className="w-4 h-4 text-amber-500" />
                    <span className="text-slate-500">Please complete all required fields</span>
                  </>
                )}
              </motion.div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center pb-8 pt-4 bg-gradient-to-t from-blue-50/30 to-transparent">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-blue-600 hover:text-blue-700 transition-colors 
                  underline decoration-blue-400 underline-offset-2"
              >
                Login here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

// Helper Components
function FieldWrapper({ id, label, error, touched, value, children }) {
  const showSuccess = touched && !error && value;
  const showError = touched && error;

  return (
    <div className="space-y-2 relative">
      <Label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </Label>
      <div className="relative">
        {children}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
            >
              <FiCheck className="h-5 w-5 text-green-600" />
            </motion.div>
          )}
          {showError && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
            >
              <FiX className="h-5 w-5 text-red-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-red-600 font-medium flex items-center gap-1"
          >
            <FiAlertCircle className="h-3 w-3" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function RequirementItem({ met, text }) {
  return (
    <div className={`flex items-center gap-1.5 ${met ? 'text-green-600' : 'text-slate-400'}`}>
      {met ? (
        <FiCheck className="h-3 w-3" />
      ) : (
        <div className="h-3 w-3 rounded-full border border-current" />
      )}
      <span>{text}</span>
    </div>
  );
}

function getInputClass(touched, error, value) {
  return `rounded-2xl border transition-all pl-11 h-12 bg-white/70 backdrop-blur-sm
    ${
      touched && error
        ? "border-red-300 bg-red-50/50 focus-visible:ring-red-200 focus-visible:border-red-400"
        : touched && value
        ? "border-green-300 bg-green-50/50 focus-visible:ring-green-200 focus-visible:border-green-400"
        : "border-slate-200 focus-visible:ring-blue-200 focus-visible:border-blue-400"
    }`;
}

export default Register;










