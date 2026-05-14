import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FiUser,
  FiMail,
  FiMessageSquare,
  FiSend,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiCheck,
  FiTag,
} from "react-icons/fi";
import {
  FaRocket,
  FaHeadset,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

// Validation Schema
const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
  subject: Yup.string()
    .trim()
    .min(5, "Subject must be at least 5 characters")
    .required("Subject is required"),
  message: Yup.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

// Custom Input Field Component
const FormField = ({
  label,
  name,
  type = "text",
  icon: Icon,
  placeholder,
  formik,
  isTextarea = false,
  maxLength,
  charCount = false,
  hint,
}) => {
  const hasError = formik.touched[name] && formik.errors[name];
  const isValid = formik.touched[name] && !formik.errors[name] && formik.values[name];
  const isTouched = formik.touched[name];

  const inputClasses = `
    w-full pl-11 pr-4 ${isTextarea ? "pt-4 pb-2" : "py-3.5"}
    bg-slate-50/80 border-2 rounded-2xl
    text-sm text-slate-800 placeholder-slate-400
    transition-all duration-300 ease-out
    focus:outline-none focus:bg-white
    ${
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
        : isValid
        ? "border-emerald-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
        : isTouched
        ? "border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10"
        : "border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10"
    }
  `;

  const IconDisplay = () => {
    if (hasError) return <FiAlertCircle className="w-5 h-5 text-red-400" />;
    if (isValid) return <FiCheck className="w-5 h-5 text-emerald-400" />;
    return <Icon className="w-5 h-5 text-slate-400" />;
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="text-sm font-semibold text-slate-700 flex items-center gap-1.5"
        >
          {label}
          <span className="text-red-400">*</span>
        </label>
        {hint && (
          <span className="text-xs text-slate-400 font-medium">{hint}</span>
        )}
      </div>

      <div className="relative">
        {/* Icon */}
        <div className="absolute left-3.5 top-3.5 z-10 pointer-events-none">
          <IconDisplay />
        </div>

        {/* Input / Textarea */}
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            rows={5}
            maxLength={maxLength}
            className={`${inputClasses} resize-none`}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            className={inputClasses}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        )}

        {/* Status indicator dot */}
        {isValid && (
          <div className="absolute right-3 top-3.5 animate-scaleIn">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <div className="flex items-start gap-1.5 animate-fadeInUp">
          <FiAlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs font-medium text-red-500">{formik.errors[name]}</p>
        </div>
      )}

      {/* Success check */}
      {isValid && !isTextarea && (
        <div className="flex items-center gap-1.5 animate-fadeInUp">
          <FiCheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          <p className="text-xs font-medium text-emerald-600">Looks good</p>
        </div>
      )}

      {/* Character counter */}
      {charCount && (
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-medium transition-colors duration-300 ${
              formik.values[name]?.length >= maxLength
                ? "text-red-400"
                : "text-slate-400"
            }`}
          >
            {formik.values[name]?.length || 0} / {maxLength}
          </span>
          {formik.values[name]?.length >= maxLength && (
            <span className="text-xs text-red-400 font-medium">
              Maximum reached
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Trust badge component
const TrustBadge = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-start gap-3 p-4 rounded-xl bg-white/60 border border-slate-100 hover:bg-white/80 transition-all duration-300 group">
    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-5 h-5 text-brand-600" />
    </div>
    <div>
      <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
      <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
    </div>
  </div>
);

// Progress Indicator
const FormProgress = ({ formik }) => {
  const fields = ["fullName", "email", "subject", "message"];
  const totalFields = fields.length;
  const validFields = fields.filter(
    (f) => formik.touched[f] && !formik.errors[f] && formik.values[f]
  ).length;
  const progress = (validFields / totalFields) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Form Progress
        </span>
        <span className="text-xs font-bold text-brand-600">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-brand-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

function Resources() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setIsSubmitting(true);
      setSubmitting(true);

      try {
        // Simulate API call with axios compatibility
        // Future integration: const response = await axios.post('/api/contact', values);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Store in localStorage for compatibility
        const contactSubmissions = JSON.parse(
          localStorage.getItem("contactSubmissions") || "[]"
        );
        contactSubmissions.push({
          ...values,
          id: Date.now(),
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem(
          "contactSubmissions",
          JSON.stringify(contactSubmissions)
        );

        setSubmittedData(values);

        toast.success("Message sent successfully! We'll get back to you soon.", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          icon: <FiCheckCircle className="w-5 h-5" />,
        });

        resetForm();
        setTimeout(() => setSubmittedData(null), 5000);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Something went wrong. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          }
        );
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    },
  });

  const isFormValid =
    formik.values.fullName &&
    formik.values.email &&
    formik.values.subject &&
    formik.values.message &&
    Object.keys(formik.errors).length === 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-100 rounded-full opacity-60 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-brand-50 rounded-full opacity-40 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto animate-fadeInUp">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 mb-6">
              <FaHeadset className="w-4 h-4 text-brand-600" />
              <span className="text-sm font-semibold text-brand-700">
                Get in Touch
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Contact{" "}
              <span className="bg-brand-600 bg-clip-text text-transparent">
                Our Team
              </span>
            </h1>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              Have a question or need assistance? We're here to help. Send us a
              message and we'll respond within 24 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Side - Info Cards */}
          <div className="lg:col-span-2 space-y-6 animate-slideInLeft">
            {/* Back to Home */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            {/* Trust Badges */}
            <div className="space-y-3">
              <TrustBadge
                icon={FaClock}
                title="Fast Response"
                subtitle="We typically respond within 24 hours on business days."
              />
              <TrustBadge
                icon={FaShieldAlt}
                title="Secure Communication"
                subtitle="Your data is encrypted and never shared with third parties."
              />
              <TrustBadge
                icon={FaRocket}
                title="Expert Support"
                subtitle="Our team of experts is ready to help you succeed."
              />
            </div>

            {/* Quick Stats */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Why Contact Us?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-brand-50">
                  <div className="text-2xl font-extrabold text-brand-600">
                    24h
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    Response Time
                  </div>
                </div>
                <div className="text-center p-3 rounded-xl bg-emerald-50">
                  <div className="text-2xl font-extrabold text-emerald-600">
                    98%
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    Satisfaction
                  </div>
                </div>
                <div className="text-center p-3 rounded-xl bg-amber-50">
                  <div className="text-2xl font-extrabold text-amber-600">
                    15k+
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    Users Helped
                  </div>
                </div>
                <div className="text-center p-3 rounded-xl bg-purple-50">
                  <div className="text-2xl font-extrabold text-purple-600">
                    4.9
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    User Rating
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-3 animate-slideInRight">
            <div className="glass-card rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50 p-6 sm:p-8">
              {/* Form Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Send a Message
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Fill in the details below and we'll get back to you.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center">
                  <FiMessageSquare className="w-6 h-6 text-brand-600" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <FormProgress formik={formik} />
              </div>

              {/* Success Card */}
              {submittedData && (
                <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 animate-scaleIn">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <FiCheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-900">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-sm text-emerald-700">
                        We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-sm text-emerald-800 bg-emerald-100/50 rounded-xl p-3">
                    <p>
                      <span className="font-semibold">From:</span>{" "}
                      {submittedData.fullName}
                    </p>
                    <p>
                      <span className="font-semibold">Subject:</span>{" "}
                      {submittedData.subject}
                    </p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={formik.handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    label="Full Name"
                    name="fullName"
                    icon={FiUser}
                    placeholder="John Doe"
                    hint="Min 3 chars"
                    formik={formik}
                  />
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    icon={FiMail}
                    placeholder="john@example.com"
                    formik={formik}
                  />
                </div>

                <FormField
                  label="Subject"
                  name="subject"
                  icon={FiTag}
                  placeholder="How can we help you?"
                  hint="Min 5 chars"
                  formik={formik}
                />

                <FormField
                  label="Message"
                  name="message"
                  icon={FiMessageSquare}
                  placeholder="Tell us more about your inquiry..."
                  hint="Min 10 chars"
                  formik={formik}
                  isTextarea
                  maxLength={500}
                  charCount
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`
                    w-full py-4 px-6 rounded-2xl font-bold text-sm
                    flex items-center justify-center gap-3
                    transition-all duration-500 ease-out
                    ${
                      isFormValid && !isSubmitting
                        ? "bg-brand-600 text-white hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-500/25 hover:-translate-y-0.5 active:translate-y-0"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Form Status Indicator */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  {isFormValid ? (
                    <>
                      <FiCheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-600 font-medium">
                        All fields look good — ready to submit
                      </span>
                    </>
                  ) : (
                    <>
                      <FiAlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Complete all fields to enable submit</span>
                    </>
                  )}
                </div>
              </form>
            </div>

            {/* Privacy note */}
            <p className="text-center text-xs text-slate-400 mt-4 px-4">
              By submitting this form, you agree to our privacy policy. We respect
              your data and never share it with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;




