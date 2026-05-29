import useAuth from "../../hooks/useAuth";

export default function CustomerSettings() {
  const { currentUser } = useAuth();
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 max-w-lg">
      <h3 className="font-semibold text-slate-800 mb-5">Preferences</h3>
      <div className="space-y-4">
        {[
          { label: "Email notifications",   checked: true },
          { label: "Order status updates",  checked: true },
          { label: "Promotional emails",    checked: false },
          { label: "Security alerts",       checked: true },
        ].map(({ label, checked }) => (
          <label key={label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 cursor-pointer">
            <span className="text-sm text-slate-700">{label}</span>
            <div className={`w-9 h-5 rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-slate-200"} relative`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}


