import { FiUsers, FiBriefcase, FiGlobe } from "react-icons/fi";

const stats = [
  { icon: FiUsers, value: "10K+", label: "Active Users" },
  { icon: FiBriefcase, value: "500+", label: "Companies" },
  { icon: FiGlobe, value: "150+", label: "Countries" },
];

export default function Client() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900">Trusted Worldwide</h2>
        <p className="mt-3 text-slate-500">Powering productivity for thousands of teams.</p>

        <div className="mt-12 grid sm:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition">
              <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <p className="text-4xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-slate-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


