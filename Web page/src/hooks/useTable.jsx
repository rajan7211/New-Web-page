import { useState, useMemo, useCallback } from "react";
import { useDebounce } from "./useDebounce";

export function useTable(data, options = {}) {
  const { searchKeys = [], defaultSort = null, pageSize = 8 } = options;

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(defaultSort);
  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(query, 250);

  const filtered = useMemo(() => {
    if (!debouncedQuery.trim()) return data;
    const q = debouncedQuery.toLowerCase();
    return data.filter((row) =>
      searchKeys.some((key) => String(row[key] ?? "").toLowerCase().includes(q))
    );
  }, [data, debouncedQuery, searchKeys]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    return [...filtered].sort((a, b) => {
      const av = String(a[sort.key] ?? "").toLowerCase();
      const bv = String(b[sort.key] ?? "").toLowerCase();
      return sort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const paged = useMemo(
    () => sorted.slice((safePage - 1) * pageSize, safePage * pageSize),
    [sorted, safePage, pageSize]
  );

  const toggleSort = useCallback((key) => {
    setSort((prev) => {
      if (prev?.key === key) return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
      return { key, dir: "asc" };
    });
    setPage(1);
  }, []);

  const handleSearch = useCallback((value) => {
    setQuery(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  return {
    rows: paged,
    total: sorted.length,
    query,
    setQuery: handleSearch,
    sort,
    toggleSort,
    page: safePage,
    totalPages,
    setPage: handlePageChange,
    pageSize,
  };
}


