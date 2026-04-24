import React from "react";
import { Search, X } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterCategory: string;
  onFilterChange: (value: string) => void;
}

export default function SearchFilters({
  searchTerm,
  onSearchChange,
  filterCategory,
  onFilterChange
}: SearchFiltersProps) {
  return (
    <div className="mt-5 relative bg-gradient-to-br from-white via-white to-gray-50/50 rounded-2xl shadow-xl shadow-gray-200/50 p-6 border border-gray-100">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-2xl -z-10" />

      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />

          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 group-focus-within:text-blue-600 group-focus-within:scale-110" />

            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc hãng..."
              value={searchTerm}
              onChange={e => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-transparent focus:outline-none transition-all duration-300 text-gray-700 placeholder:text-gray-400 font-medium shadow-sm hover:shadow-md focus:shadow-lg relative"
              style={{
                background:
                  "linear-gradient(white, white) padding-box, linear-gradient(to right, rgb(59, 130, 246), rgb(99, 102, 241)) border-box"
              }}
            />

            {searchTerm &&
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-all duration-200 group/clear"
              >
                <X className="w-4 h-4 text-gray-400 group-hover/clear:text-gray-600 transition-colors" />
              </button>}
          </div>
        </div>
      </div>

      {/* Active filter indicator */}
      {filterCategory !== "all" &&
        <div className="mt-4 flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg">
            <span className="text-sm font-medium text-indigo-700">Lọc:</span>
            <span className="text-sm font-semibold text-indigo-900">
              {filterCategory}
            </span>
            <button
              onClick={() => onFilterChange("all")}
              className="ml-1 p-0.5 hover:bg-indigo-200 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5 text-indigo-600" />
            </button>
          </div>
        </div>}
    </div>
  );
}
