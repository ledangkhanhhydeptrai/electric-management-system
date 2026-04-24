import React from "react";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: "All" | "DRAFT" | "PENDING" | "COMPLETED" | "CANCELLED";
  onFilterChange: (value: "All" | "DRAFT" | "PENDING" | "COMPLETED" | "CANCELLED") => void;
  onCreateClick: () => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  onCreateClick
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 w-full lg:w-auto">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên khách hàng hoặc mã hợp đồng..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filter */}
        <div className="flex gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="w-full lg:w-48 pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
              value={filterStatus}
              onChange={e => onFilterChange(e.target.value as "All" | "DRAFT" | "PENDING" | "COMPLETED" | "CANCELLED")}
            >
              <option value="All">Tất cả trạng thái</option>
              <option value="DRAFT">Nháp</option>
              <option value="PENDING">Đang thực hiện</option>
              <option value="COMPLETED">Hoàn thành</option>
              <option value="CANCELLED">Đã hủy</option>
            </select>
          </div>

          <button
            onClick={onCreateClick}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <FaPlus />
            Tạo hợp đồng
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
