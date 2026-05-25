import { useState } from "react";
import { FiLayers, FiZap, FiShield, FiArrowUpRight } from "react-icons/fi";

const categories = ["All", "Productivity", "Security", "Collaboration"];
const features = [
  { icon: FiLayers, title: "Project Management", cat: "Productivity" },
  { icon: FiZap, title: "Real-time Sync", cat: "Collaboration" },
  { icon: FiShield, title: "Enterprise Security", cat: "Security" },
  { icon: FiLayers, title: "Smart Automation", cat: "Productivity" },
];

export default function Project() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? features : features.filter(f => f.cat === active);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Features for <span className="text-blue-600">Success</span></h2>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setActive(c)} className={`px-5 py-2 rounded-full text-sm font-bold border transition ${active === c ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((f, i) => (
            <div key={i} className="group p-6 bg-white rounded-2xl border hover:border-blue-400 transition cursor-pointer">
              <f.icon className="w-8 h-8 text-blue-600 mb-4" />
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900">{f.title}</h3>
                <FiArrowUpRight className="opacity-0 group-hover:opacity-100 text-blue-600 transition" />
              </div>
              <p className="text-xs text-slate-400 mt-2 uppercase font-bold tracking-widest">{f.cat}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}