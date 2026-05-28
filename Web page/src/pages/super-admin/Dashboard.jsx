import { motion } from "framer-motion";
import { FiUsers, FiShoppingBag, FiActivity, FiTrendingUp } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";

function Dashboard() {
  const { getManagedCustomers } = useAuth();
  const customers = getManagedCustomers();
  const activeCustomers = customers.filter(c => c.status === "active").length;

  const stats = [
    { 
      title: "Total Customers", 
      value: customers.length, 
      icon: <FiUsers />, 
      color: "from-blue-500 to-blue-600" 
    },
    { 
      title: "Active Customers", 
      value: activeCustomers, 
      icon: <FiActivity />, 
      color: "from-green-500 to-green-600" 
    },
    { 
      title: "Total Orders", 
      value: customers.length * 2, 
      icon: <FiShoppingBag />, 
      color: "from-amber-500 to-amber-600" 
    },
    { 
      title: "This Month", 
      value: "+5", 
      icon: <FiTrendingUp />, 
      color: "from-purple-500 to-purple-600" 
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-slate-600 mt-1">Manage customers and track activity</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="rounded-2xl border-white/40 shadow-xl bg-white/60 backdrop-blur-sm hover:shadow-2xl transition-all transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg text-2xl`}>
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

      <Card className="rounded-2xl border-white/40 shadow-xl bg-gradient-to-r from-blue-50/60 to-indigo-50/60 backdrop-blur-sm p-8">
        <div className="flex items-center gap-3 text-blue-600 mb-4">
          <FiTrendingUp className="h-6 w-6" />
          <h2 className="text-xl font-bold">Quick Overview</h2>
        </div>
        <p className="text-slate-600 leading-relaxed">
          You have {activeCustomers} active customers out of {customers.length} total customers. 
          Use the sidebar to navigate to customer management and view detailed reports on their activity and orders.
        </p>
      </Card>
    </div>
  );
}

export default Dashboard;


