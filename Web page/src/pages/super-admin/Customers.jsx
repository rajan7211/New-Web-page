import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingBag, FiUserCheck, FiUsers } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import DataTable from "../../components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function Customers() {
  const { users, canImpersonate, startImpersonating, getDashboardRoute } = useAuth();
  const navigate = useNavigate();

  const customers = useMemo(() => users.filter(u => u.role === "Customer"), [users]);

  const handleImpersonate = (user) => {
    startImpersonating(user);
    navigate(getDashboardRoute(user.role), { replace: true });
  };

  const stats = [
    { 
      title: "Total Customers", 
      value: customers.length, 
      icon: <FiUsers />, 
      color: "from-emerald-500 to-emerald-600",
    },
    { 
      title: "Active Customers", 
      value: customers.filter(c => c.status === "active").length, 
      icon: <FiShoppingBag />, 
      color: "from-blue-500 to-blue-600",
    },
  ];

  const columns = useMemo(
    () => [
      {
        key: "name",
        label: "Customer Name",
        sortable: true,
        render: (user) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 
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
        key: "email",
        label: "Email",
        sortable: true,
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (user) => (
          <Badge className={user.status === "active" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-amber-100 text-amber-700 hover:bg-amber-100"}>
            {user.status}
          </Badge>
        ),
      },
      {
        key: "createdAt",
        label: "Registration Date",
        sortable: true,
        render: (user) => new Date(user.createdAt).toLocaleDateString(),
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
                      hover:bg-amber-50 hover:border-amber-500"
                  >
                    <FiUserCheck className="w-4 h-4" />
                    Impersonate
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View as {user.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null,
      },
    ],
    [canImpersonate]
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Customer Management
        </h1>
        <p className="text-slate-600 mt-1">View and manage customer accounts</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="rounded-2xl border-white/40 shadow-xl bg-white/60 backdrop-blur-sm hover:shadow-2xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg text-2xl`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <DataTable 
        data={customers} 
        columns={columns} 
        searchKeys={["name", "email", "status"]}
        pageSize={10}
      />
    </div>
  );
}

export default Customers;


