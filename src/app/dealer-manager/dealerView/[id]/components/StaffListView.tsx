// components/dealer-detail-view/StaffListView.tsx
import React, { useState, useMemo } from "react";
import { Users, Search } from "lucide-react";
import { DealerStaffResponse } from "./types";
import { StaffItemView } from "./StaffItemView";

interface StaffListViewProps {
  staffs: DealerStaffResponse[];
  // deleteConfirm: string | null;
  // onRemoveStaff: (staffId: string) => void;
}

export const StaffListView: React.FC<StaffListViewProps> = ({
  staffs,
  // deleteConfirm,
  // onRemoveStaff
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter staffs based on search
  const filteredStaffs = useMemo(() => {
    if (!searchTerm.trim()) return staffs;
    
    const term = searchTerm.toLowerCase();
    return staffs.filter((staff) =>
      staff.fullName.toLowerCase().includes(term) ||
      staff.id.toLowerCase().includes(term)
    );
  }, [staffs, searchTerm]);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Nhân viên phụ trách
            </h2>
            <p className="text-blue-100 text-sm">
              {filteredStaffs.length} thành viên
            </p>
          </div>
        </div>

        {/* Search bar if has staffs */}
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white text-xl leading-none"
              >
                ×
              </button>
            )}
          </div>
        )}
      </div>

      {/* Staff List */}
      <div className="p-6 max-h-[600px] overflow-y-auto">
        {staffs.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-gray-900 font-bold text-lg mb-2">
              Chưa có nhân viên
            </h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              Dealer này chưa được phân công nhân viên phụ trách
            </p>
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
          // Staff List
          <div className="space-y-3">
            {filteredStaffs.map((staff, index) => (
              <div
                key={staff.id}
                className="animate-fadeIn"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: "backwards"
                }}
              >
                <StaffItemView
                  staff={staff}
                  // deleteConfirm={deleteConfirm}
                  // onRemove={onRemoveStaff}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      {staffs.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-t px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-semibold">
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