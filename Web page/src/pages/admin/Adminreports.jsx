import { useMemo } from "react";
import useAuth from "../../hooks/useAuth";

export function AdminReports() {
  const { getManagedCustomers, orders } = useAuth();
  const customers = useMemo(() => getManagedCustomers(), [getManagedCustomers]);
  const active    = customers.filter((c) => c.status === "active").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Total Customers", value: customers.length },
          { label: "Active",          value: active },
          { label: "Inactive",        value: customers.length - active },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-sm text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Customer Status Overview</h3>
        <div className="flex gap-3">
          <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${customers.length ? (active/customers.length)*100 : 0}%` }} />
          </div>
        </div>
        <div className="flex gap-6 mt-3 text-xs">
          <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-emerald-500" />Active ({active})</span>
          <span className="flex items-center gap-1.5 text-slate-600"><span className="w-2 h-2 rounded-full bg-slate-200" />Inactive ({customers.length - active})</span>
        </div>
      </div>
    </div>
  );
}

export function AdminSettings() {
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

export default AdminReports;






