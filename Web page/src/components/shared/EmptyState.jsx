import { Search } from "lucide-react";

export function EmptyState({ message = "No results found", submessage }) {
  return (
    <div className="flex flex-col items-center gap-2 py-12 text-slate-400">
      <Search className="h-12 w-12 text-slate-300" aria-hidden="true" />
      <p className="font-medium text-sm">{message}</p>
      {submessage && <p className="text-xs">{submessage}</p>}
    </div>
  );
}