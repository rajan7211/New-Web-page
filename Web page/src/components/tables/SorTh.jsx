import { ChevronUp, ChevronDown } from "lucide-react";

export function SortTh({ label, sortKey, sort, onSort, className = "" }) {
  const active = sort?.key === sortKey;
  return (
    <th
      scope="col"
      className={`px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer select-none hover:text-slate-700 transition-colors ${className}`}
      onClick={() => onSort(sortKey)}
      aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
    >
      <span className="flex items-center gap-1">
        {label}
        <span className="flex flex-col" style={{ lineHeight: 0 }}>
          <ChevronUp
            className={`w-3 h-3 ${active && sort.dir === "asc" ? "text-blue-600" : "text-slate-300"}`}
          />
          <ChevronDown
            className={`w-3 h-3 -mt-1 ${active && sort.dir === "desc" ? "text-blue-600" : "text-slate-300"}`}
          />
        </span>
      </span>
    </th>
  );
}