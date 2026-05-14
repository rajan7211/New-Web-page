import React from "react";
import { FiDownload, FiChrome, FiGitlab } from "react-icons/fi";

function Extension() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Powerful <span className="bg-brand-600 bg-clip-text text-transparent">Integrations</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Connect with your favorite tools and streamline your workflow.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { icon: FiChrome, name: "Chrome Extension" },
            { icon: FiGitlab, name: "GitLab" },
            { icon: FiDownload, name: "Desktop App" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-brand-200 hover:bg-brand-50 transition-all cursor-pointer"
            >
              <item.icon className="w-6 h-6 text-brand-600" />
              <span className="font-semibold text-slate-700">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Extension;
