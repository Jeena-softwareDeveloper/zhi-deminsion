'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Inbox,
  Loader2,
} from 'lucide-react';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  accessor?: (row: T) => any;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor?: (item: T, index: number) => string;
  loading?: boolean;
  searchPlaceholder?: string;
  searchable?: boolean;
  searchFilter?: (item: T, query: string) => boolean;
  filterSlot?: React.ReactNode;
  actionsSlot?: React.ReactNode;
  pageSize?: number;
  emptyTitle?: string;
  emptySubtitle?: string;
  emptyIcon?: React.ReactNode;
  className?: string;
  hideToolbar?: boolean;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor = (item: any, i) => item._id || item.id || item.slug || String(i),
  loading = false,
  searchPlaceholder = 'Search records...',
  searchable = true,
  searchFilter,
  filterSlot,
  actionsSlot,
  pageSize = 10,
  emptyTitle = 'No records found',
  emptySubtitle = 'Try adjusting your search or filters to find what you are looking for.',
  emptyIcon,
  className = '',
  hideToolbar = false,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const showToolbar = !hideToolbar && (searchable || Boolean(filterSlot) || Boolean(actionsSlot));

  // Handle Search Filtering
  const filteredData = useMemo(() => {
    if (!search.trim()) return data;

    if (searchFilter) {
      return data.filter((item) => searchFilter(item, search.trim()));
    }

    // Default shallow search across all values
    const query = search.toLowerCase().trim();
    return data.filter((item: any) => {
      return Object.values(item).some((val) => {
        if (typeof val === 'string' || typeof val === 'number') {
          return String(val).toLowerCase().includes(query);
        }
        return false;
      });
    });
  }, [data, search, searchFilter]);

  // Handle Sorting
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    const col = columns.find((c) => c.key === sortKey);
    return [...filteredData].sort((a, b) => {
      let aVal = col?.accessor ? col.accessor(a) : (a as any)[sortKey];
      let bVal = col?.accessor ? col.accessor(b) : (b as any)[sortKey];

      if (aVal === undefined || aVal === null) aVal = '';
      if (bVal === undefined || bVal === null) bVal = '';

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const strA = String(aVal).toLowerCase();
      const strB = String(bVal).toLowerCase();

      if (strA < strB) return sortOrder === 'asc' ? -1 : 1;
      if (strA > strB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortOrder, columns]);

  // Handle Pagination
  const totalItems = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, safePage, pageSize]);

  const handleSort = (colKey: string, sortable?: boolean) => {
    if (!sortable) return;
    if (sortKey === colKey) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else {
        setSortKey(null);
        setSortOrder('asc');
      }
    } else {
      setSortKey(colKey);
      setSortOrder('asc');
    }
  };

  const getAlignmentClass = (align?: 'left' | 'center' | 'right') => {
    if (align === 'center') return 'text-center';
    if (align === 'right') return 'text-right';
    return 'text-left';
  };

  return (
    <div className={`flex flex-col min-h-0 flex-1 w-full space-y-3.5 ${className}`}>
      {/* Table Toolbar: Search, Filters & Actions (Fixed/Pinned at top) */}
      {showToolbar && (
        <div className="shrink-0 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            {/* Filter Slot (e.g. Category Dropdown) */}
            {filterSlot && <div className="shrink-0">{filterSlot}</div>}

            {/* Search Input */}
            {searchable && (
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                />
              </div>
            )}
          </div>

          {/* Action Slot (e.g. Refresh, View Toggle) */}
          {actionsSlot && <div className="flex items-center space-x-2 shrink-0">{actionsSlot}</div>}
        </div>
      )}

      {/* Main Table Container: Fills 100% remaining vertical space */}
      <div className="flex-1 min-h-0 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* ONLY THIS INNER WRAPPER SCROLLS VERTICALLY & HORIZONTALLY */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto relative">
          <table className="w-full text-left text-sm text-slate-600 border-collapse">
            <thead className="bg-slate-50 sticky top-0 z-20 shadow-xs border-b border-slate-200">
              <tr>
                {columns.map((col) => {
                  const isSorted = sortKey === col.key;
                  return (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key, col.sortable)}
                      className={`sticky top-0 z-20 bg-slate-50 py-3.5 px-4 select-none border-b border-slate-200 ${getAlignmentClass(
                        col.align
                      )} ${
                        col.sortable ? 'cursor-pointer hover:bg-slate-100/90 transition-colors' : ''
                      } ${col.headerClassName || ''}`}
                    >
                      <div
                        className={`flex items-center space-x-1.5 ${
                          col.align === 'center'
                            ? 'justify-center'
                            : col.align === 'right'
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {col.header}
                        </span>
                        {col.sortable && (
                          <span className="text-slate-400">
                            {isSorted ? (
                              sortOrder === 'asc' ? (
                                <ArrowUp className="w-3.5 h-3.5 text-orange-500" />
                              ) : (
                                <ArrowDown className="w-3.5 h-3.5 text-orange-500" />
                              )
                            ) : (
                              <ArrowUpDown className="w-3.5 h-3.5 opacity-40 hover:opacity-100" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="py-20 text-center">
                    <div className="inline-flex flex-col items-center justify-center space-y-2 text-slate-400">
                      <Loader2 className="w-7 h-7 animate-spin text-orange-500" />
                      <span className="text-xs font-semibold">Loading data...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="py-20 text-center">
                    <div className="max-w-sm mx-auto flex flex-col items-center justify-center text-center p-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                        {emptyIcon || <Inbox className="w-6 h-6" />}
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">{emptyTitle}</h4>
                      <p className="text-xs text-slate-500 mt-1">{emptySubtitle}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => {
                  const key = keyExtractor(row, index);
                  return (
                    <tr
                      key={key}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {columns.map((col) => {
                        const content = col.render
                          ? col.render(row, (safePage - 1) * pageSize + index)
                          : col.accessor
                          ? col.accessor(row)
                          : (row as any)[col.key];

                        return (
                          <td
                            key={col.key}
                            className={`py-3.5 px-4 text-xs ${getAlignmentClass(col.align)} ${
                              col.className || ''
                            }`}
                          >
                            {content}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pinned Pagination Footer (Never scrolls away) */}
        {!loading && totalItems > 0 && (
          <div className="shrink-0 p-3.5 sm:px-5 sm:py-3.5 bg-slate-50/70 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="font-medium">
              Showing <span className="font-bold text-slate-800">{(safePage - 1) * pageSize + 1}</span> to{' '}
              <span className="font-bold text-slate-800">
                {Math.min(safePage * pageSize, totalItems)}
              </span>{' '}
              of <span className="font-bold text-slate-800">{totalItems}</span> entries
            </div>

            {totalPages > 1 && (
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 transition-colors flex items-center space-x-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - safePage) <= 1
                    );
                  })
                  .map((page, idx, arr) => {
                    const prevPage = arr[idx - 1];
                    const showEllipsis = prevPage && page - prevPage > 1;

                    return (
                      <React.Fragment key={page}>
                        {showEllipsis && <span className="px-1 text-slate-400">...</span>}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                            safePage === page
                              ? 'bg-orange-500 text-white shadow-xs'
                              : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 transition-colors flex items-center space-x-1"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
