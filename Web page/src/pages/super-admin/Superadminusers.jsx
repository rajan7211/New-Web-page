import { useNavigate } from "react-router-dom";
import { FiUserCheck, FiFilter } from "react-icons/fi";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useTable, SearchBar, SortTh, Pagination } from "../../components/TableUtils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const roleColors = {
  "Super Admin": "bg-violet-100 text-violet-700",
  Admin:         "bg-blue-100 text-blue-700",
  Customer:      "bg-emerald-100 text-emerald-700",
};

export default function SuperAdminUsers() {
  const { users, canImpersonate, startImpersonating, getDashboardRoute } = useAuth();
  const navigate = useNavigate();
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = roleFilter === "All" ? users : users.filter((u) => u.role === roleFilter);

  const { rows, total, query, setQuery, sort, toggleSort, page, totalPages, setPage, pageSize } =
    useTable(filtered, { searchKeys: ["name", "email", "role", "status"], defaultSort: { key: "name", dir: "asc" }, pageSize: 8 });

  const handleImpersonate = (user) => {
    startImpersonating(user);
    navigate(getDashboardRoute(user.role), { replace: true });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-100">
        <SearchBar value={query} onChange={setQuery} placeholder="Search users…" className="w-64" />
        <div className="flex items-center gap-1 ml-auto">
          <FiFilter className="w-3.5 h-3.5 text-slate-400 mr-1" />
          {["All", "Super Admin", "Admin", "Customer"].map((r) => (
            <button key={r} onClick={() => { setRoleFilter(r); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${roleFilter === r ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <SortTh label="Name"   sortKey="name"   sort={sort} onSort={toggleSort} className="pl-5" />
              <SortTh label="Email"  sortKey="email"  sort={sort} onSort={toggleSort} />
              <SortTh label="Role"   sortKey="role"   sort={sort} onSort={toggleSort} />
              <SortTh label="Status" sortKey="status" sort={sort} onSort={toggleSort} />
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.length > 0 ? rows.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-sm font-bold text-slate-700 shrink-0">
                      {u.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-slate-800">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-slate-500">{u.email}</td>
                <td className="px-4 py-3.5">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${roleColors[u.role] || "bg-slate-100 text-slate-600"}`}>{u.role}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`flex items-center gap-1.5 text-xs font-medium ${u.status === "active" ? "text-emerald-600" : "text-amber-600"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${u.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`} />
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  {canImpersonate(u) ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => handleImpersonate(u)}
                            className="gap-1.5 text-xs h-7 rounded-lg border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-400">
                            <FiUserCheck className="w-3.5 h-3.5" />Impersonate
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>View app as {u.name}</p></TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : <span className="text-slate-300 text-xs">—</span>}
                </td>
              </tr>
            )) : (
              <tr><td colSpan={5} className="py-12 text-center text-slate-400 text-sm">No users match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} total={total} pageSize={pageSize} onPage={setPage} />
    </div>
  );
}

