import { FiBarChart2, FiTrendingUp, FiUsers, FiActivity } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

export function SuperAdminAnalytics() {
  const { totalUsers, totalAdmins, totalCustomers, activeUsers } = useAuth();
  const metrics = [
    { label: "Total Users",    value: totalUsers,     icon: FiUsers,     color: "text-blue-600 bg-blue-100" },
    { label: "Active Users",   value: activeUsers,    icon: FiActivity,  color: "text-emerald-600 bg-emerald-100" },
    { label: "Admins",         value: totalAdmins,    icon: FiBarChart2, color: "text-violet-600 bg-violet-100" },
    { label: "Customers",      value: totalCustomers, icon: FiTrendingUp,color: "text-amber-600 bg-amber-100" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-sm text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Platform Activity</h3>
        <p className="text-sm text-slate-500">Analytics charts would be rendered here with real data integration (e.g. Recharts or Chart.js).</p>
        <div className="mt-4 grid grid-cols-7 gap-1 items-end h-24">
          {[40,65,50,80,70,90,60].map((h, i) => (
            <div key={i} className="bg-blue-200 rounded-t-md hover:bg-blue-500 transition-colors cursor-pointer" style={{ height: `${h}%` }} title={`Day ${i+1}`} />
          ))}
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => <span key={d}>{d}</span>)}
        </div>
      </div>
    </div>
  );
}

export function SuperAdminSettings() {
  return (
    <div className="space-y-4">
      {[
        { title: "General Settings", fields: [{ label: "Platform Name", value: "Whitepace" }, { label: "Support Email", value: "support@whitepace.io" }] },
        { title: "Security",         fields: [{ label: "Session Timeout", value: "30 minutes" }, { label: "2FA Required", value: "No" }] },
      ].map(({ title, fields }) => (
        <div key={title} className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">{title}</h3>
          <div className="space-y-3">
            {fields.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-600">{label}</span>
                <span className="text-sm font-semibold text-slate-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SuperAdminAnalytics;







