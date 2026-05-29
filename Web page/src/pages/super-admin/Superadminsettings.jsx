export default function SuperAdminSettings() {
  return (
    <div className="space-y-4">
      {[
        { title: "General Settings", fields: [{ label: "Platform Name", value: "Whitepace" }, { label: "Support Email", value: "support@whitepace.io" }] },
        { title: "Security",         fields: [{ label: "Session Timeout", value: "30 minutes" }, { label: "2FA Required", value: "No" }] },
      ].map(({ title, fields }) => (
        <div key={title} className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">{title}</h3>
          <div className="space-y-3">
            {fields.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-600">{label}</span>
                <span className="text-sm font-semibold text-slate-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


