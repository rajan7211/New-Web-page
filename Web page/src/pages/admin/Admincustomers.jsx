import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiUserCheck } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { useTable, SearchBar, SortTh, Pagination } from "../../components/TableUtils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function AdminCustomers() {
  const { getManagedCustomers, canImpersonate, startImpersonating, getDashboardRoute } = useAuth();
  const navigate  = useNavigate();
  const customers = useMemo(() => getManagedCustomers(), [getManagedCustomers]);

  const { rows, total, query, setQuery, sort, toggleSort, page, totalPages, setPage, pageSize } =
    useTable(customers, { searchKeys: ["name", "email", "status"], pageSize: 8 });

  const handleImpersonate = (c) => {
    startImpersonating(c);
    navigate(getDashboardRoute(c.role), { replace: true });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
        <SearchBar value={query} onChange={setQuery} placeholder="Search customers…" className="w-64" />
        <span className="ml-auto text-xs text-slate-500">{total} customer{total !== 1 ? "s" : ""}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <SortTh label="Name"   sortKey="name"   sort={sort} onSort={toggleSort} className="pl-5" />
              <SortTh label="Email"  sortKey="email"  sort={sort} onSort={toggleSort} />
              <SortTh label="Status" sortKey="status" sort={sort} onSort={toggleSort} />
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.length > 0 ? rows.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700">{c.name.charAt(0)}</div>
                    <span className="font-semibold text-slate-800">{c.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-slate-500">{c.email}</td>
                <td className="px-4 py-3.5">
                  <span className={`flex items-center gap-1.5 text-xs font-medium ${c.status === "active" ? "text-emerald-600" : "text-amber-600"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${c.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`} />{c.status}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  {canImpersonate(c) ? (
                    <TooltipProvider><Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => handleImpersonate(c)}
                          className="gap-1.5 text-xs h-7 rounded-lg border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-400">
                          <FiUserCheck className="w-3.5 h-3.5" />Impersonate
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>View app as {c.name}</p></TooltipContent>
                    </Tooltip></TooltipProvider>
                  ) : <span className="text-slate-300 text-xs">—</span>}
                </td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="py-12 text-center text-slate-400 text-sm">No customers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} total={total} pageSize={pageSize} onPage={setPage} />
    </div>
  );
}

