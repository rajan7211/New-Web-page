import React from "react";
import { FiCheckCircle } from "react-icons/fi";

function Company() {
  return (
    <section className="py-20 company">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-6">
          <FiCheckCircle className="w-8 h-8 text-brand-600" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Company</h2>
        <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
          This is the Company section. It renders correctly in your Whitepace application.
        </p>
      </div>
    </section>
  );
}

export default Company;


