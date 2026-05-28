import { useState, useMemo } from "react";
import { FiSearch, FiChevronUp, FiChevronDown, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function DataTable({ 
  data, 
  columns, 
  searchKeys = [], 
  pageSize = 10,
  className = "" 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);

  // Search functionality
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    
    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = key.split('.').reduce((obj, k) => obj?.[k], item);
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, searchKeys]);

  // Sort functionality
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aVal = sortConfig.key.split('.').reduce((obj, k) => obj?.[k], a);
      const bVal = sortConfig.key.split('.').reduce((obj, k) => obj?.[k], b);
      
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      
      if (typeof aVal === 'string') {
        return sortConfig.direction === "asc" 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and Items Per Page */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 rounded-xl bg-white/70 backdrop-blur-sm border-slate-200 
              focus:border-blue-400 transition-all shadow-sm"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 whitespace-nowrap">Rows per page:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-20 rounded-xl bg-white/70 backdrop-blur-sm border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/30 bg-white/50 backdrop-blur-xl 
          overflow-hidden shadow-xl shadow-slate-200/50"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 
                hover:from-blue-100/80 hover:to-indigo-100/80 border-b border-white/30 transition-all">
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={`text-slate-700 font-bold px-6 ${
                      col.sortable ? "cursor-pointer select-none hover:text-blue-600 transition-colors" : ""
                    }`}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div className="flex items-center gap-2">
                      {col.label}
                      {col.sortable && (
                        <span className="text-slate-400">
                          {sortConfig.key === col.key ? (
                            sortConfig.direction === "asc" ? (
                              <FiChevronUp className="h-4 w-4 text-blue-600" />
                            ) : (
                              <FiChevronDown className="h-4 w-4 text-blue-600" />
                            )
                          ) : (
                            <div className="flex flex-col gap-0">
                              <FiChevronUp className="h-3 w-3 -mb-1" />
                              <FiChevronDown className="h-3 w-3" />
                            </div>
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, idx) => (
                  <motion.tr
                    key={item.id || idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-blue-50/50 border-b border-white/20 transition-all duration-200"
                  >
                    {columns.map((col) => (
                      <TableCell key={col.key} className="px-6 py-4">
                        {col.render ? col.render(item) : item[col.key]}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-12 text-slate-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <FiSearch className="h-12 w-12 text-slate-300" />
                      <p className="font-medium">No results found</p>
                      {searchTerm && (
                        <p className="text-sm">Try adjusting your search terms</p>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 
          px-2 py-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="font-semibold">{Math.min(currentPage * itemsPerPage, sortedData.length)}</span> of{" "}
            <span className="font-semibold">{sortedData.length}</span> results
          </p>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="rounded-xl hidden sm:flex"
            >
              <FiChevronsLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-xl"
            >
              Previous
            </Button>
            
            <div className="flex gap-1">
              {getPageNumbers().map((page, idx) => (
                page === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-3 py-2 text-slate-400">...</span>
                ) : (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-xl min-w-[40px] ${
                      page === currentPage
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                        : "hover:bg-blue-50"
                    }`}
                  >
                    {page}
                  </Button>
                )
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-xl"
            >
              Next
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="rounded-xl hidden sm:flex"
            >
              <FiChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;







