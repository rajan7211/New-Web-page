import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";

function Solutions() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all mb-8"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="w-8 h-8 text-brand-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Solutions</h1>
          <p className="mt-4 text-lg text-slate-500">
            This page is working correctly in your Whitepace application.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Solutions;






