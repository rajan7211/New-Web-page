const ROLE_STYLES = {
  "Super Admin": "bg-violet-100 text-violet-700",
  Admin: "bg-blue-100 text-blue-700",
  Customer: "bg-emerald-100 text-emerald-700",
};

export function RoleBadge({ role, className = "" }) {
  return (
    <span
      className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${ROLE_STYLES[role] || "bg-slate-100 text-slate-600"} ${className}`}
    >
      {role}
    </span>
  );
}