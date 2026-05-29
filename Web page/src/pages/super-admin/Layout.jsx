// SuperAdminAdmins.jsx
import { useNavigate } from "react-router-dom";
import { FiUserCheck } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { useTable, SearchBar, SortTh, Pagination } from "../../components/TableUtils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function SuperAdminAdmins() {
  const { users, canImpersonate, startImpersonating, getDashboardRoute } = useAuth();
  const navigate = useNavigate();
  const admins = users.filter((u) => u.role === "Admin");
  const { rows, total, query, setQuery, sort, toggleSort, page, totalPages, setPage, pageSize } =
    useTable(admins, { searchKeys: ["name", "email", "status"], pageSize: 8 });

  const handleImpersonate = (user) => {
    startImpersonating(user);
    navigate(getDashboardRoute(user.role), { replace: true });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
        <SearchBar value={query} onChange={setQuery} placeholder="Search admins…" className="w-64" />
        <span className="ml-auto text-xs text-slate-500">{total} admin{total !== 1 ? "s" : ""}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <SortTh label="Name"   sortKey="name"   sort={sort} onSort={toggleSort} className="pl-5" />
              <SortTh label="Email"  sortKey="email"  sort={sort} onSort={toggleSort} />
              <SortTh label="Status" sortKey="status" sort={sort} onSort={toggleSort} />
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.length > 0 ? rows.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700">{u.name.charAt(0)}</div>
                    <span className="font-semibold text-slate-800">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-slate-500">{u.email}</td>
                <td className="px-4 py-3.5">
                  <span className={`flex items-center gap-1.5 text-xs font-medium ${u.status === "active" ? "text-emerald-600" : "text-amber-600"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${u.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`} />{u.status}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  {canImpersonate(u) ? (
                    <TooltipProvider><Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => handleImpersonate(u)}
                          className="gap-1.5 text-xs h-7 rounded-lg border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-400">
                          <FiUserCheck className="w-3.5 h-3.5" />Impersonate
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>View as {u.name}</p></TooltipContent>
                    </Tooltip></TooltipProvider>
                  ) : <span className="text-slate-300 text-xs">—</span>}
                </td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="py-12 text-center text-slate-400 text-sm">No admins found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} total={total} pageSize={pageSize} onPage={setPage} />
    </div>
  );
}

export default SuperAdminAdmins;


