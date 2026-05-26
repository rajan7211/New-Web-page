import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiUsers, FiShield, FiCheckCircle, FiUserCheck, FiEye } from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";
import useAuth from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function SuperAdminDashboard() {
  const { users, totalAdmins, totalCustomers, totalUsers, activeUsers,
          canImpersonate, startImpersonating, getDashboardRoute, isImpersonating } = useAuth();
  const [roleFilter, setRoleFilter] = useState("All");
  const navigate = useNavigate();

  const filteredUsers = useMemo(
    () => users.filter((user) => roleFilter === "All" || user.role === roleFilter),
    [users, roleFilter]
  );

  const handleImpersonate = (targetUser) => {
    startImpersonating(targetUser);
    navigate(getDashboardRoute(targetUser.role), { replace: true });
  };

  return (
    <DashboardLayout title="System Overview" subtitle="Manage users and platform health">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatBox title="All Users"  value={totalUsers}     icon={<FiUsers />}       color="text-blue-600" />
          <StatBox title="Admins"     value={totalAdmins}    icon={<FiShield />}      color="text-indigo-600" />
          <StatBox title="Customers"  value={totalCustomers} icon={<FiUser />}        color="text-emerald-600" />
          <StatBox title="Active Now" value={activeUsers}    icon={<FiCheckCircle />} color="text-sky-600" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">User Directory</h3>

            </div>

            {/* Role Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {["All", "Super Admin", "Admin", "Customer"].map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    roleFilter === role
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => {
                    const impersonatable = canImpersonate(user);
                    return (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-slate-900">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            user.role === "Super Admin" ? "bg-slate-900 text-white" :
                            user.role === "Admin"       ? "bg-blue-100 text-blue-700" :
                                                          "bg-emerald-100 text-emerald-700"
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${user.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`} />
                            <span className="capitalize text-slate-600 font-medium">{user.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {impersonatable ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleImpersonate(user)}
                                    className="gap-1.5 text-xs rounded-lg border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition-all"
                                  >
                                    <FiUserCheck className="w-3.5 h-3.5" />
                                    Impersonate
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View the app as {user.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <span className="text-xs text-slate-400 italic">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-slate-400">
                      No users found in this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatBox({ title, value, icon, color }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`text-2xl p-3 rounded-xl bg-slate-50 ${color}`}>{icon}</div>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;



