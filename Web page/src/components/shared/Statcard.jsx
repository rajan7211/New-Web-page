import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function StatCard({ title, value, sub, icon: Icon, color, to }) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Link
        to={to}
        className="group block bg-white rounded-2xl border border-slate-100 p-5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200"
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
        </div>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-sm font-medium text-slate-600 mt-0.5">{title}</p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </Link>
    </motion.div>
  );
}