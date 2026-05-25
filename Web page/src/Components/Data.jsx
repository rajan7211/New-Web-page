import { useState } from "react";
import { FiDatabase, FiServer, FiCloud, FiChevronDown } from "react-icons/fi";

const dataPoints = [
  { icon: FiDatabase, title: "Real-time Database", detail: "Sub-50ms query response times globally." },
  { icon: FiServer, title: "99.99% Uptime", detail: "Enterprise-grade SLA with automated failover." },
  { icon: FiCloud, title: "Unlimited Storage", detail: "Auto-scaling storage from GBs to PBs." },
];

export default function Data() {
  const [active, setActive] = useState(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Data Infrastructure</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {dataPoints.map((item, i) => (
            <div key={i} className="bg-slate-50 rounded-2xl border p-6 hover:border-blue-300 transition">
              <item.icon className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className={`mt-2 text-slate-500 text-sm transition-all ${active === i ? "" : "line-clamp-1"}`}>
                {item.detail}
              </p>
              <button onClick={() => setActive(active === i ? null : i)} className="mt-4 text-blue-600 text-xs font-bold flex items-center gap-1">
                {active === i ? "LESS" : "LEARN MORE"} <FiChevronDown className={active === i ? "rotate-180" : ""} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  
}