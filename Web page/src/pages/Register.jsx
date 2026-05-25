import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const registerValidationSchema = Yup.object({
  firstName:       Yup.string().trim().min(2, "At least 2 characters").required("First name is required"),
  lastName:        Yup.string().trim().min(2, "At least 2 characters").required("Last name is required"),
  email:           Yup.string().email("Invalid email").required("Email is required"),
  password:        Yup.string().min(6, "At least 6 characters").required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm your password"),
  role:            Yup.string().oneOf(["Super Admin", "Admin", "Customer"]).required("Select a role"),
});

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword,        setShowPassword]        = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading,           setIsLoading]           = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "", lastName: "", email: "",
      password: "", confirmPassword: "", role: "Customer",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await register(values);
        if (values.role === "Customer") {
          toast.success(`Welcome ${values.firstName}!`);
          setTimeout(() => { navigate("/", { replace: true }); window.location.reload(); }, 500);
        } else {
          toast.success("Registration successful! Please login.");
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
    formik.values.firstName && formik.values.lastName && formik.values.email &&
    formik.values.password && formik.values.confirmPassword && formik.values.role &&
    Object.keys(formik.errors).length === 0;

  const fieldClass = (name) =>
    `rounded-xl border transition-all pl-10 ${
      formik.touched[name] && formik.errors[name]
        ? "border-red-300 bg-red-50 focus-visible:ring-red-200"
        : "border-slate-200 bg-slate-50 focus-visible:ring-blue-100"
    }`;

  return (
    <div className="min-h-[calc(100vh-84px)] bg-slate-100 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-lg"
      >
        <Card className="rounded-3xl border-slate-200 shadow-2xl shadow-slate-200/70">
          <CardHeader className="text-center pb-4 pt-8">
            <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
              <FiUser className="h-7 w-7" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Create Account</CardTitle>
            <CardDescription>Join Whitepace today and start your journey.</CardDescription>
          </CardHeader>

          <CardContent className="px-8">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Name row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldWrapper id="firstName" label="First name" error={formik.touched.firstName && formik.errors.firstName}>
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                  <Input
                    id="firstName" name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                    placeholder="John" className={fieldClass("firstName")}
                  />
                </FieldWrapper>
                <FieldWrapper id="lastName" label="Last name" error={formik.touched.lastName && formik.errors.lastName}>
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                  <Input
                    id="lastName" name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                    placeholder="Doe" className={fieldClass("lastName")}
                  />
                </FieldWrapper>
              </div>

              {/* Email */}
              <FieldWrapper id="email" label="Email Address" error={formik.touched.email && formik.errors.email}>
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                <Input
                  id="email" name="email" type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                  placeholder="you@example.com" className={fieldClass("email")}
                />
              </FieldWrapper>

              {/* Password */}
              <FieldWrapper id="password" label="Password" error={formik.touched.password && formik.errors.password}>
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                <Input
                  id="password" name="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                  placeholder="••••••••" className={`${fieldClass("password")} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </FieldWrapper>

              {/* Confirm password */}
              <FieldWrapper id="confirmPassword" label="Confirm Password" error={formik.touched.confirmPassword && formik.errors.confirmPassword}>
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                <Input
                  id="confirmPassword" name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                  placeholder="••••••••" className={`${fieldClass("confirmPassword")} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showConfirmPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </FieldWrapper>

              {/* Role select */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-slate-700">Select User Role</Label>
                <Select
                  value={formik.values.role}
                  onValueChange={(val) => formik.setFieldValue("role", val)}
                >
                  <SelectTrigger className="rounded-xl border-slate-200 bg-slate-50 focus:ring-blue-100">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Customer">Customer (User)</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.role && formik.errors.role && (
                  <p className="text-xs text-red-600 font-medium">{formik.errors.role}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full rounded-xl py-5 text-sm font-bold shadow-lg mt-2 transition-all
                  ${isLoading || !isFormValid
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25"
                  }`}
              >
                {isLoading
                  ? <><FiLoader className="h-4 w-4 animate-spin mr-2" />Processing...</>
                  : "Sign Up"
                }
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center pb-8 pt-2">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Login here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

/** Reusable field wrapper with icon slot */
function FieldWrapper({ id, label, error, children }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-semibold text-slate-700">{label}</Label>
      <div className="relative">{children}</div>
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}

export default Register;





