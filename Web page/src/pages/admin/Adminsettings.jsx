import useAuth from "../../hooks/useAuth";

export default function AdminSettings() {
  const { currentUser } = useAuth();
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 max-w-lg">
      <h3 className="font-semibold text-slate-800 mb-5">Admin Profile</h3>
      <div className="space-y-3">
        {[
          { label: "Name",  value: currentUser?.name },
          { label: "Email", value: currentUser?.email },
          { label: "Role",  value: currentUser?.role },
          { label: "Status",value: currentUser?.status },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
            <span className="text-sm text-slate-500">{label}</span>
            <span className="text-sm font-semibold text-slate-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}







