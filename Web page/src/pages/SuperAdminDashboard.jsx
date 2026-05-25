import { useMemo, useState } from "react";
import { FiUser, FiUsers, FiShield, FiCheckCircle } from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";
import useAuth from "../hooks/useAuth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const ROLE_FILTERS = ["All", "Super Admin", "Admin", "Customer"];

function SuperAdminDashboard() {
  const { users, totalAdmins, totalCustomers, totalUsers, activeUsers } = useAuth();
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = useMemo(
    () => users.filter((u) => roleFilter === "All" || u.role === roleFilter),
    [users, roleFilter]
  );

  const stats = [
    { title: "All Users",   value: totalUsers,     icon: <FiUsers />,       color: "text-blue-600",   bg: "bg-blue-50" },
    { title: "Admins",      value: totalAdmins,    icon: <FiShield />,      color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Customers",   value: totalCustomers, icon: <FiUser />,        color: "text-emerald-600",bg: "bg-emerald-50" },
    { title: "Active Now",  value: activeUsers,    icon: <FiCheckCircle />, color: "text-sky-600",    bg: "bg-sky-50" },
  ];

  const roleBadgeVariant = (role) => {
    if (role === "Super Admin") return "bg-slate-900 text-white hover:bg-slate-800";
    if (role === "Admin")       return "bg-blue-100 text-blue-700 hover:bg-blue-100";
    return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100";
  };

  return (
    <DashboardLayout title="System Overview" subtitle="Manage users and platform health">
      <div className="space-y-6">
        {/* Stats grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ title, value, icon, color, bg }) => (
            <Card key={title} className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`rounded-xl p-3 text-2xl ${bg} ${color}`}>{icon}</div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
                  <p className="text-2xl font-bold text-slate-900">{value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User directory */}
        <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-lg font-bold text-slate-800">User Directory</CardTitle>
              <div className="flex flex-wrap gap-2">
                {ROLE_FILTERS.map((role) => (
                  <Button
                    key={role}
                    variant={roleFilter === role ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRoleFilter(role)}
                    className={`rounded-full text-xs font-semibold transition-all ${
                      roleFilter === role
                        ? "bg-slate-900 hover:bg-slate-800 text-white border-transparent"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-100">
                  <TableHead className="text-slate-500 font-semibold px-6">User</TableHead>
                  <TableHead className="text-slate-500 font-semibold px-6">Role</TableHead>
                  <TableHead className="text-slate-500 font-semibold px-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-slate-50/60 border-slate-100 transition-colors">
                      <TableCell className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 ${roleBadgeVariant(user.role)}`}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${user.status === "active" ? "bg-emerald-500" : "bg-amber-400"}`} />
                          <span className="capitalize text-sm text-slate-600 font-medium">{user.status}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="py-10 text-center text-slate-400">
                      No users found in this category.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default SuperAdminDashboard;





