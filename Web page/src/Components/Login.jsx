import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn, FiLoader } from "react-icons/fi";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Too short").required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setTimeout(() => {
        onLogin({ name: "User", email: values.email });
        navigate("/");
      }, 1000);
    },
  });

  const Input = ({ label, name, type, icon: Icon }) => (
    <div className="text-left">
      <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          {...formik.getFieldProps(name)}
          type={type}
          className="w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      {formik.touched[name] && formik.errors[name] && <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl space-y-5">
        <div className="text-center">
          <FiLogIn className="w-12 h-12 text-blue-600 mx-auto mb-2" />
          <h2 className="text-2xl font-bold">Welcome Back</h2>
        </div>

        <Input label="Email" name="email" type="email" icon={FiMail} />
        <div className="relative">
          <Input label="Password" name="password" type={showPass ? "text" : "password"} icon={FiLock} />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-[38px] text-slate-400">
            {showPass ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 flex justify-center items-center gap-2">
          {loading ? <FiLoader className="animate-spin" /> : "Sign In"}
        </button>
        
        <p className="text-center text-sm text-slate-500">
          No account? <Link to="/register" className="text-blue-600 font-bold">Register</Link>
        </p>
      </form>
    </div>
  );
}