import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-50 rounded-full opacity-50 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-brand-100 rounded-full opacity-30 blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-3xl animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-sm font-medium text-brand-700">New Features Available</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Work smarter,{" "}
            <span className="bg-brand-600 bg-clip-text text-transparent">not harder</span>
          </h1>
          <p className="mt-6 text-xl text-slate-500 leading-relaxed max-w-2xl">
            Whitepace is the all-in-one workspace that helps teams collaborate, 
            manage projects, and get more done in less time.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 text-white font-semibold rounded-2xl hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/25 transition-all duration-300"
            >
              Get Started Free
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-700 font-semibold rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
