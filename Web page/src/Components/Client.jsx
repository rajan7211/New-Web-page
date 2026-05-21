import { FiUsers, FiBriefcase, FiGlobe } from "react-icons/fi";

const stats = [
  { icon: FiUsers, value: "10K+", label: "Active Users" },
  { icon: FiBriefcase, value: "500+", label: "Companies" },
  { icon: FiGlobe, value: "150+", label: "Countries" },
];

export default function Client() {
  return (
    <section className="py-20 bg-">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-6">
          <FiUsers className="w-6 h-6 text-blue-600" />
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Trusted by Clients Worldwide
        </h2>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          Join thousands of teams that rely on Whitepace to power their productivity.
        </p>

        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-sm transition-all duration-300"
            >
              <stat.icon className="w-7 h-7 text-blue-600 mx-auto mb-4" />
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}











