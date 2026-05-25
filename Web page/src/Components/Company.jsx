import { useState } from "react";
import { FiEye, FiHeart, FiTarget } from "react-icons/fi";

const tabs = [
  { id: "mission", label: "Mission", icon: FiTarget, content: "To empower every team to achieve more." },
  { id: "vision", label: "Vision", icon: FiEye, content: "Intelligent workspace collaboration for all." },
  { id: "value", label: "Values", icon: FiHeart, content: "Integrity, innovation, and impact." },
];

export default function Company() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900">Our Company</h2>
        
        <div className="mt-8 flex justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition ${
                activeTab.id === tab.id ? "bg-blue-600 text-white" : "bg-white text-slate-600 border"
              }`}
            >
              <tab.icon /> {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8 p-10 bg-white rounded-3xl shadow-sm border">
          <activeTab.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
          <p className="text-xl text-slate-700 leading-relaxed">{activeTab.content}</p>
        </div>
      </div>
    </section>
  );
}


