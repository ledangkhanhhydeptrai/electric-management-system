import React from "react";
import { Search } from "lucide-react";

interface OrderFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onStatusChange: (value: string) => void;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onStatusChange
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 backdrop-blur-lg bg-opacity-90">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên dealer, nhân viên hoặc model xe..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="REQUESTED">Đã gửi yêu cầu</option>
          <option value="APPROVED">Đã duyệt</option>
          <option value="REJECTED">Đã từ chối</option>
          <option value="IN_PRODUCTION">Đang sản xuất</option>
          <option value="IN_TRANSIT">Đang vận chuyển</option>
          <option value="DELIVERED">Đã giao đến đại lý</option>
          <option value="CANCELLED">Đã hủy</option>
        </select>
      </div>
    </div>
  );
};

export default OrderFilters;
