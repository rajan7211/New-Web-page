import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiUserCheck, FiUsers, FiActivity, FiShield } from "react-icons/fi";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import DataTable from "../../components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function Users() {
  const { users, canImpersonate, startImpersonating, getDashboardRoute } = useAuth();
  const navigate = useNavigate();

  const handleImpersonate = (user) => {
    startImpersonating(user);
    navigate(getDashboardRoute(user.role), { replace: true });
  };

  const stats = [
    { 
      title: "Total Users", 
      value: users.length, 
      icon: <FiUsers />, 
      color: "from-blue-500 to-blue-600",
    },
    { 
      title: "Super Admins", 
      value: users.filter(u => u.role === "Super Admin").length, 
      icon: <FiShield />, 
      color: "from-purple-500 to-purple-600",
    },
    { 
      title: "Admins", 
      value: users.filter(u => u.role === "Admin").length, 
      icon: <FiShield />, 
      color: "from-indigo-500 to-indigo-600",
    },
    { 
      title: "Active Users", 
      value: users.filter(u => u.status === "active").length, 
      icon: <FiActivity />, 
      color: "from-green-500 to-green-600",
    },
  ];

  const columns = useMemo(
    () => [
      {
        key: "name",
        label: "User",
        sortable: true,
        render: (user) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 
              flex items-center justify-center text-white font-bold shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          </div>
        ),
      },
      {
        key: "role",
        label: "Role",
        sortable: true,
        render: (user) => (
          <Badge
            className={`${
              user.role === "Super Admin"
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                : user.role === "Admin"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                : "bg-gradient-to-r from-green-500 to-green-600 text-white"
            } shadow-lg`}
          >
            {user.role}
          </Badge>
        ),
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (user) => (
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                user.status === "active" ? "bg-green-500 animate-pulse" : "bg-amber-500"
              }`}
            />
            <span className="capitalize font-medium text-slate-700">{user.status}</span>
          </div>
        ),
      },
      {
        key: "createdAt",
        label: "Joined",
        sortable: true,
        render: (user) => (
          <span className="text-sm text-slate-600">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        ),
      },
      {
        key: "actions",
        label: "Actions",
        render: (user) =>
          canImpersonate(user) ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleImpersonate(user)}
                    className="gap-2 rounded-xl border-amber-300 text-amber-700 
                      hover:bg-amber-50 hover:border-amber-500 transition-all shadow-sm
                      hover:shadow-md transform hover:scale-105"
                  >
                    <FiUserCheck className="w-4 h-4" />
                    Impersonate
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-900 text-white border-0">
                  <p>View the app as {user.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <span className="text-slate-400 italic text-sm">—</span>
          ),
      },
    ],
    [canImpersonate]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
            bg-clip-text text-transparent">
            All Users
          </h1>
          <p className="text-slate-600 mt-1">Manage and monitor all platform users</p>
        </div>
        <Badge 
          variant="secondary" 
          className="text-lg px-4 py-2 bg-white/80 backdrop-blur-sm shadow-lg
            border border-white/50"
        >
          {users.length} Total Users
        </Badge>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="rounded-2xl border-white/40 shadow-xl bg-white/60 backdrop-blur-sm 
              hover:shadow-2xl transition-all transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} 
                    text-white shadow-lg text-2xl`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Data Table */}
      <DataTable 
        data={users} 
        columns={columns} 
        searchKeys={["name", "email", "role", "status"]}
        pageSize={10}
      />
    </div>
  );
}

export default Users;

