import React from "react";
import { Search, Filter } from "lucide-react";

interface SearchBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export default function SearchBar({
  searchValue,
  onSearchChange,
  onSearch,
  showFilters,
  onToggleFilters
}: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
      <div className="relative flex-1 w-full md:max-w-md">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên nhân viên..."
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
          onKeyPress={e => e.key === "Enter" && onSearch()}
          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all duration-300"
        />
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        <button
          onClick={onToggleFilters}
          className={`flex items-center gap-2 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${showFilters
            ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
            : "bg-white text-gray-700 border-2 border-gray-200"}`}
        >
          <Filter size={20} />
          <span>Bộ Lọc</span>
        </button>
      </div>
    </div>
  );
}
