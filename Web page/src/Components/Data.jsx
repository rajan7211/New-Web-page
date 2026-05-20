import { useState } from "react";
import { FiDatabase, FiServer, FiCloud, FiChevronDown } from "react-icons/fi";

const dataPoints = [
  {
    icon: FiDatabase,
    title: "Real-time Database",
    summary: "Sub-50ms query response times globally.",
    detail:
      "Our distributed edge architecture ensures your data is always available with automatic replication across 12 regions.",
  },
  {
    icon: FiServer,
    title: "99.99% Uptime",
    summary: "Enterprise-grade SLA guarantee.",
    detail:
      "Redundant infrastructure with automated failover. We maintain 99.99% uptime with zero maintenance windows.",
  },
  {
    icon: FiCloud,
    title: "Unlimited Storage",
    summary: "Scale without worrying about limits.",
    detail:
      "From gigabytes to petabytes, our storage layer auto-scales. Pay only for what you use with intelligent tiering.",
  },
];

export default function Data() {
  const [expanded, setExpanded] = useState({});

  const toggle = (idx) => {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section id="data" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Data <span className="text-blue-600">Infrastructure</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500">Built for scale, security, and speed.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {dataPoints.map((item, i) => (
            <div
              key={i}
              className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-200 transition-all duration-300"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-slate-500">{item.summary}</p>
              </div>
              <div
                className={`px-6 bg-white border-t border-slate-100 transition-all duration-300 ${
                  expanded[i] ? "max-h-40 py-4" : "max-h-0 py-0"
                } overflow-hidden`}
              >
                <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
              </div>
              <button
                onClick={() => toggle(i)}
                className="w-full py-3 flex items-center justify-center gap-1 text-xs font-medium text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors"
              >
                {expanded[i] ? "Show Less" : "Learn More"}
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${expanded[i] ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}









