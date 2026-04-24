// components/dealer-detail/StaffList.tsx
import React, { useState, useMemo } from "react";
import { Users, UserPlus, Search, ChevronDown } from "lucide-react";
import { DealerStaffResponse } from "./types";
import { StaffItem } from "./StaffItem";

interface StaffListProps {
  staffs: DealerStaffResponse[];
  deleteConfirm: string | null;
  onAddClick: () => void;
  onRemoveStaff: (staffId: string) => void;
  isLoading?: boolean;
}

export const StaffList: React.FC<StaffListProps> = ({
  staffs,
  deleteConfirm,
  onAddClick,
  onRemoveStaff,
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY = 5;

  // Filter và search
  const filteredStaffs = useMemo(() => {
    if (!searchTerm.trim()) return staffs;
    
    const term = searchTerm.toLowerCase();
    return staffs.filter((staff) =>
      staff.fullName.toLowerCase().includes(term) ||
      staff.id.toLowerCase().includes(term)
    );
  }, [staffs, searchTerm]);

  // Display staffs với pagination
  const displayedStaffs = showAll
    ? filteredStaffs
    : filteredStaffs.slice(0, INITIAL_DISPLAY);

  const hasMore = filteredStaffs.length > INITIAL_DISPLAY;
  const remainingCount = filteredStaffs.length - INITIAL_DISPLAY;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-6">
      {/* Header với gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Nhân viên</h2>
              <p className="text-blue-100 text-sm">
                {filteredStaffs.length} thành viên
              </p>
            </div>
          </div>
          <button
            onClick={onAddClick}
            className="bg-white text-blue-600 p-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 group"
            title="Thêm nhân viên"
          >
            <UserPlus className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>
        </div>

        {/* Search bar nếu có staff */}
        {staffs.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
            <input
              type="text"
              placeholder="Tìm kiếm nhân viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-blue-200 focus:bg-white/20 focus:border-white/40 focus:outline-none transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white"
              >
                ×
              </button>
            )}
          </div>
        )}
      </div>

      {/* Staff List */}
      <div className="p-6">
        {isLoading ? (
          // Skeleton Loading
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex items-center gap-3 p-4 bg-gray-100 rounded-xl"
              >
                <div className="w-12 h-12 bg-gray-300 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-3 bg-gray-300 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : staffs.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-gray-900 font-bold text-lg mb-2">
              Chưa có nhân viên
            </h3>
            <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
              Hãy thêm nhân viên để họ có thể quản lý và phụ trách đại lý này
            </p>
            <button
              onClick={onAddClick}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              <UserPlus className="w-5 h-5" />
              Thêm nhân viên ngay
            </button>
          </div>
        ) : filteredStaffs.length === 0 ? (
          // No Search Results
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium mb-1">
              Không tìm thấy {searchTerm}
            </p>
            <p className="text-gray-400 text-sm">
              Thử tìm kiếm với từ khóa khác
            </p>
          </div>
        ) : (
          // Staff List với animation
          <div className="space-y-3">
            {displayedStaffs.map((staff, index) => (
              <div
                key={staff.id}
                className="animate-fadeIn"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: "backwards"
                }}
              >
                <StaffItem
                  staff={staff}
                  deleteConfirm={deleteConfirm}
                  onRemove={onRemoveStaff}
                />
              </div>
            ))}

            {/* Show More Button */}
            {hasMore && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 transition-all group text-gray-700 hover:text-blue-700 font-semibold"
              >
                <span>Xem thêm {remainingCount} nhân viên</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            )}

            {/* Show Less Button */}
            {showAll && hasMore && (
              <button
                onClick={() => setShowAll(false)}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 transition-all group text-gray-700 hover:text-blue-700 font-semibold"
              >
                <span>Thu gọn</span>
                <ChevronDown className="w-5 h-5 rotate-180 group-hover:-translate-y-1 transition-transform" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      {staffs.length > 0 && (
        <div className="bg-gray-50 border-t px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium">
                {filteredStaffs.length} nhân viên đang hoạt động
              </span>
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};