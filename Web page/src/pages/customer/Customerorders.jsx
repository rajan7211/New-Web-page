import { useMemo } from "react";
import useAuth from "../../hooks/useAuth";
import { useTable, SearchBar, SortTh, Pagination } from "../../components/TableUtils";

const statusColors = {
  Delivered:  "bg-emerald-100 text-emerald-700",
  Processing: "bg-sky-100 text-sky-700",
  Shipped:    "bg-violet-100 text-violet-700",
};

export default function CustomerOrders() {
  const { currentUser, getOrdersForCustomer } = useAuth();
  const orders = useMemo(() => getOrdersForCustomer(currentUser?.id), [getOrdersForCustomer, currentUser]);

  const { rows, total, query, setQuery, sort, toggleSort, page, totalPages, setPage, pageSize } =
    useTable(orders, { searchKeys: ["id", "status", "placedAt"], pageSize: 8 });

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
        <SearchBar value={query} onChange={setQuery} placeholder="Search orders…" className="w-64" />
        <span className="ml-auto text-xs text-slate-500">{total} order{total !== 1 ? "s" : ""}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <SortTh label="Order ID" sortKey="id"       sort={sort} onSort={toggleSort} className="pl-5" />
              <SortTh label="Date"     sortKey="placedAt" sort={sort} onSort={toggleSort} />
              <SortTh label="Status"   sortKey="status"   sort={sort} onSort={toggleSort} />
              <SortTh label="Total"    sortKey="total"    sort={sort} onSort={toggleSort} />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.length > 0 ? rows.map((o) => (
              <tr key={o.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-5 py-3.5 font-semibold text-slate-800">{o.id}</td>
                <td className="px-4 py-3.5 text-slate-500">{o.placedAt}</td>
                <td className="px-4 py-3.5">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${statusColors[o.status] || "bg-slate-100 text-slate-600"}`}>{o.status}</span>
                </td>
                <td className="px-4 py-3.5 font-bold text-slate-900">${o.total}</td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="py-12 text-center text-slate-400 text-sm">No orders match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} total={total} pageSize={pageSize} onPage={setPage} />
    </div>
  );
}


