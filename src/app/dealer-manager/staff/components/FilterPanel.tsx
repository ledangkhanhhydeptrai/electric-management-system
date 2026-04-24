import React from "react";
import { Calendar } from "lucide-react";

interface SearchFilters {
  q?: string;
  role?: string;
  status?: string;
  createdFrom?: string;
  createdTo?: string;
}

interface FilterPanelProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  onReset: () => void;
}

export default function FilterPanel({
  filters,
  onFilterChange,
  onSearch,
  onReset
}: FilterPanelProps) {
  return (
    <div className="border-t-2 border-gray-100 pt-4 mt-4 animate-slideDown">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Role Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
            Vai Trò
          </label>
          <select
            value={filters.role}
            onChange={(e) =>
              onFilterChange({ ...filters, role: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-purple-500 transition-all duration-300"
          >
            <option value="">Tất cả vai trò</option>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
            <option value="STAFF">Staff</option>
            <option value="USER">User</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
            Trạng Thái
          </label>
          <select
            value={filters.status}
            onChange={(e) =>
              onFilterChange({ ...filters, status: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-purple-500 transition-all duration-300"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="ACTIVE">Đang hoạt động</option>
            <option value="INACTIVE">Không hoạt động</option>
            <option value="SUSPENDED">Tạm ngưng</option>
          </select>
        </div>

        {/* Date From */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
            Từ Ngày
          </label>
          <div className="relative">
            <Calendar
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="date"
              value={filters.createdFrom}
              onChange={(e) =>
                onFilterChange({ ...filters, createdFrom: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-purple-500 transition-all duration-300"
            />
          </div>
        </div>

        {/* Date To */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
            Đến Ngày
          </label>
          <div className="relative">
            <Calendar
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="date"
              value={filters.createdTo}
              onChange={(e) =>
                onFilterChange({ ...filters, createdTo: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-purple-500 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={onSearch}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl text-sm font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          🔍 Tìm Kiếm
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-all duration-300"
        >
          ↻ Đặt Lại
        </button>
      </div>
    </div>
  );
}
