import { motion } from "framer-motion";
import { FiBarChart3, FiTrendingUp, FiUsers, FiActivity } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Analytics() {
  const { totalUsers, totalAdmins, totalCustomers, activeUsers } = useAuth();

  const analyticsData = [
    {
      title: "User Growth",
      value: "+12%",
      subtitle: "compared to last month",
      icon: <FiTrendingUp />,
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Active Sessions",
      value: activeUsers,
      subtitle: "users currently online",
      icon: <FiActivity />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Total Platform Users",
      value: totalUsers,
      subtitle: "registered users",
      icon: <FiUsers />,
      color: "from-purple-500 to-pink-600"
    },
  ];

  const chartData = [
    { label: "Jan", value: 45 },
    { label: "Feb", value: 52 },
    { label: "Mar", value: 48 },
    { label: "Apr", value: 61 },
    { label: "May", value: 55 },
    { label: "Jun", value: 67 },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-slate-600 mt-1">Platform analytics and insights</p>
      </motion.div>

      {/* Analytics Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        {analyticsData.map((data, index) => (
          <motion.div
            key={data.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="rounded-2xl border-white/40 shadow-xl bg-white/60 backdrop-blur-sm hover:shadow-2xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {data.title}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{data.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{data.subtitle}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${data.color} text-white shadow-lg text-2xl`}>
                    {data.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="rounded-2xl border-white/40 shadow-xl bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>User Growth Trend</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-end justify-between h-48 gap-4">
              {chartData.map((data, index) => (
                <div key={data.label} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${data.value * 2}px` }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="w-full bg-gradient-to-t from-blue-500 to-indigo-600 rounded-t-lg shadow-lg hover:shadow-xl transition-all"
                  />
                  <span className="text-xs font-semibold text-slate-600">{data.label}</span>
                  <span className="text-xs font-bold text-slate-900">{data.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Statistics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid gap-6 sm:grid-cols-2"
      >
        <Card className="rounded-2xl border-white/40 shadow-xl bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiBarChart3 className="text-blue-600" />
              User Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Super Admins</span>
                  <span className="text-sm font-bold text-slate-900">1</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: "5%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Admins</span>
                  <span className="text-sm font-bold text-slate-900">{totalAdmins}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: `${(totalAdmins / totalUsers) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Customers</span>
                  <span className="text-sm font-bold text-slate-900">{totalCustomers}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: `${(totalCustomers / totalUsers) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-white/40 shadow-xl bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-600">Page Load Time</span>
                <span className="text-sm font-bold text-green-600">1.2s</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-600">API Response</span>
                <span className="text-sm font-bold text-green-600">245ms</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-600">Uptime</span>
                <span className="text-sm font-bold text-green-600">99.9%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-600">Database Health</span>
                <span className="text-sm font-bold text-green-600">Optimal</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Analytics;


