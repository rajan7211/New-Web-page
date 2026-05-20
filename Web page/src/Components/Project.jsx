import { useState } from "react";
import { FiLayers, FiZap, FiShield, FiArrowUpRight } from "react-icons/fi";

const categories = ["All", "Productivity", "Security", "Collaboration"];

const features = [
  {
    icon: FiLayers,
    title: "Project Management",
    desc: "Organize tasks, set deadlines, and track progress with intuitive boards and timelines.",
    category: "Productivity",
  },
  {
    icon: FiZap,
    title: "Real-time Collaboration",
    desc: "Work together seamlessly with live editing, comments, and instant notifications.",
    category: "Collaboration",
  },
  {
    icon: FiShield,
    title: "Enterprise Security",
    desc: "Bank-level encryption and compliance standards to keep your data safe.",
    category: "Security",
  },
  {
    icon: FiLayers,
    title: "Smart Automation",
    desc: "Automate repetitive tasks with custom workflows and triggers.",
    category: "Productivity",
  },
  {
    icon: FiZap,
    title: "Video Conferencing",
    desc: "Built-in HD video calls with screen sharing and recording.",
    category: "Collaboration",
  },
  {
    icon: FiShield,
    title: "SSO & SAML",
    desc: "Single sign-on integration with your existing identity provider.",
    category: "Security",
  },
];

export default function Project() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? features
      : features.filter((f) => f.category === activeCategory);

  return (
    <section id="project" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Everything you need to <span className="text-blue-600">succeed</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Powerful features designed for modern teams
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((f, i) => (
            <div
              key={i}
              className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <f.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
                <FiArrowUpRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-blue-600 transition-all" />
              </div>
              <p className="mt-2 text-slate-500 leading-relaxed">{f.desc}</p>
              <span className="inline-block mt-4 text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                {f.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}











