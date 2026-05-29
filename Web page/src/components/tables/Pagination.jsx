import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ page, totalPages, total, pageSize, onPage }) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-slate-100">
      <p className="text-xs text-slate-500">
        Showing <span className="font-semibold text-slate-700">{start}–{end}</span> of{" "}
        <span className="font-semibold text-slate-700">{total}</span>
      </p>
      <nav aria-label="Pagination" className="flex items-center gap-1">
        <button
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="px-2 text-slate-400 text-sm" aria-hidden="true">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPage(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-semibold transition-colors
                ${p === page
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPage(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
          className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </nav>
    </div>
  );
}