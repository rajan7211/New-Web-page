import { motion } from "framer-motion";
import { FiBarChart3, FiTrendingUp, FiDownloadCloud } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Reports() {
  const reports = [
    {
      title: "Customer Activity Report",
      description: "Detailed activity logs for all customers",
      date: "Generated today",
      icon: <FiBarChart3 className="h-6 w-6" />,
    },
    {
      title: "Sales Report",
      description: "Monthly sales and revenue analysis",
      date: "Last updated: 2 days ago",
      icon: <FiTrendingUp className="h-6 w-6" />,
    },
    {
      title: "User Engagement Report",
      description: "User engagement metrics and analytics",
      date: "Last updated: Today",
      icon: <FiBarChart3 className="h-6 w-6" />,
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Reports
        </h1>
        <p className="text-slate-600 mt-1">View and download comprehensive reports</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, index) => (
          <motion.div
            key={report.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="rounded-2xl border-white/40 shadow-xl bg-white/60 backdrop-blur-sm hover:shadow-2xl transition-all">
              <CardHeader className="flex flex-row items-start gap-3">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                  {report.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <p className="text-xs text-slate-500 mt-1">{report.description}</p>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-xs text-slate-500 mb-4">{report.date}</p>
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl gap-2"
                >
                  <FiDownloadCloud className="h-4 w-4" />
                  Download Report
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Reports;