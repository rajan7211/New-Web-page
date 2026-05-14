import React from "react";
import { FiLayers, FiZap, FiShield } from "react-icons/fi";

function Project() {
  const features = [
    {
      icon: FiLayers,
      title: "Project Management",
      desc: "Organize tasks, set deadlines, and track progress with intuitive boards and timelines.",
    },
    {
      icon: FiZap,
      title: "Real-time Collaboration",
      desc: "Work together seamlessly with live editing, comments, and instant notifications.",
    },
    {
      icon: FiShield,
      title: "Enterprise Security",
      desc: "Bank-level encryption and compliance standards to keep your data safe.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Everything you need to{" "}
            <span className="bg-brand-600 bg-clip-text text-transparent">succeed</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-3xl border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <f.icon className="w-7 h-7 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Project;
