// src/components/ui/modern-card.jsx
import { motion } from "framer-motion";

export function ModernCard({ children, className = "", gradient = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-3xl border border-white/20 shadow-2xl overflow-hidden
        ${gradient 
          ? "bg-gradient-to-br from-white/70 to-white/40" 
          : "bg-white/60"
        } backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
























