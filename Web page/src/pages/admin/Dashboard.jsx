import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiActivity, FiArrowRight } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

export default function AdminDashboard() {
  const { getManagedCustomers } = useAuth();
  const customers = useMemo(() => getManagedCustomers(), [getManagedCustomers]);
  const active    = customers.filter((c) => c.status === "active").length;
  const recent    = [...customers].slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
            <FiUsers className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{customers.length}</p>
          <p className="text-sm text-slate-500 mt-0.5">Total Customers</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
            <FiActivity className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{active}</p>
          <p className="text-sm text-slate-500 mt-0.5">Active Customers</p>
        </div>
      </div>

      {/* Recent customers */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Recent Customers</h3>
          <Link to="/admin/customers" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View all <FiArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="divide-y divide-slate-50">
          {recent.map((c) => (
            <div key={c.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/60 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700">{c.name.charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{c.name}</p>
                <p className="text-xs text-slate-500 truncate">{c.email}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                {c.status}
              </span>
            </div>
          ))}
          {recent.length === 0 && <p className="py-8 text-center text-sm text-slate-400">No customers yet.</p>}
        </div>
      </div>
    </div>
  );
}

