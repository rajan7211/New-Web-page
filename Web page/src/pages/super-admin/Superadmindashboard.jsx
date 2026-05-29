import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiShield, FiShoppingBag, FiActivity, FiArrowRight, FiTrendingUp } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

function StatCard({ title, value, sub, icon: Icon, color, to }) {
  return (
    <Link to={to} className="group block bg-white rounded-2xl border border-slate-100 p-5 hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <FiArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm font-medium text-slate-600 mt-0.5">{title}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </Link>
  );
}

export default function SuperAdminDashboard() {
  const { users, totalAdmins, totalCustomers, totalUsers, activeUsers } = useAuth();

  const recentUsers = useMemo(
    () => [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
    [users]
  );

  const roleColors = {
    "Super Admin": "bg-violet-100 text-violet-700",
    Admin:         "bg-blue-100 text-blue-700",
    Customer:      "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users"    value={totalUsers}     sub="All accounts"      icon={FiUsers}       color="bg-blue-100 text-blue-600"    to="/super-admin/users" />
        <StatCard title="Admins"         value={totalAdmins}    sub="Manage access"     icon={FiShield}      color="bg-violet-100 text-violet-600" to="/super-admin/admins" />
        <StatCard title="Customers"      value={totalCustomers} sub="Active buyers"     icon={FiShoppingBag} color="bg-emerald-100 text-emerald-600" to="/super-admin/customers" />
        <StatCard title="Active Now"     value={activeUsers}    sub="Online accounts"   icon={FiActivity}    color="bg-amber-100 text-amber-600"   to="/super-admin/users" />
      </div>

      {/* Two column section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent users */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Recent Users</h3>
            <Link to="/super-admin/users" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View all <FiArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentUsers.map((u) => (
              <div key={u.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/60 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-700 text-sm font-bold shrink-0">
                  {u.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{u.name}</p>
                  <p className="text-xs text-slate-500 truncate">{u.email}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${roleColors[u.role] || "bg-slate-100 text-slate-600"}`}>
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick breakdown */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Role Breakdown</h3>
          <div className="space-y-3">
            {[
              { label: "Customers", count: totalCustomers, total: totalUsers, color: "bg-emerald-500" },
              { label: "Admins",    count: totalAdmins,    total: totalUsers, color: "bg-blue-500" },
              { label: "Super",     count: users.filter(u => u.role === "Super Admin").length, total: totalUsers, color: "bg-violet-500" },
            ].map(({ label, count, total, color }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-700">{label}</span>
                  <span className="text-slate-500">{count}/{total}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${total ? (count/total)*100 : 0}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center gap-2 text-emerald-600">
              <FiTrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">{activeUsers} active users</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{totalUsers > 0 ? Math.round((activeUsers/totalUsers)*100) : 0}% of all accounts are active</p>
          </div>
        </div>
      </div>
    </div>
  );
}


