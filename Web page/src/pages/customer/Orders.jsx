import useAuth from "../../hooks/useAuth";

export default function CustomerProfile() {
  const { currentUser } = useAuth();
  const initial = currentUser?.name?.charAt(0)?.toUpperCase() || "U";
  return (
    <div className="max-w-lg space-y-4">
      {/* Avatar card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
          {initial}
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">{currentUser?.name}</h2>
          <p className="text-sm text-slate-500">{currentUser?.email}</p>
          <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
            {currentUser?.role}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Account Details</h3>
        <div className="space-y-3">
          {[
            { label: "First Name", value: currentUser?.firstName || currentUser?.name?.split(" ")[0] },
            { label: "Last Name",  value: currentUser?.lastName  || currentUser?.name?.split(" ")[1] },
            { label: "Email",      value: currentUser?.email },
            { label: "Role",       value: currentUser?.role },
            { label: "Status",     value: currentUser?.status },
            { label: "Member since", value: currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : "—" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
              <span className="text-sm text-slate-500">{label}</span>
              <span className="text-sm font-semibold text-slate-900">{value || "—"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



