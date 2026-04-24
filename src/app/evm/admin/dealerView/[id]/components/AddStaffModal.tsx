// components/dealer-detail/AddStaffModal.tsx
import React from "react";
import { UserPlus, X, Search, Users } from "lucide-react";
import { Staff } from "@/services/staffService/staff";

interface AddStaffModalProps {
  show: boolean;
  searchQuery: string;
  filteredStaff: Staff[];
  paginatedStaff: Staff[];
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  itemsPerPage: number;
  onClose: () => void;
  onSearchChange: (value: string) => void;
  onAddStaff: (staffId: string[]) => void;
  onPageChange: (page: number) => void;
  getPageNumbers: () => (number | string)[];
}

export const AddStaffModal: React.FC<AddStaffModalProps> = ({
  show,
  searchQuery,
  filteredStaff,
  paginatedStaff,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  itemsPerPage,
  onClose,
  onSearchChange,
  onAddStaff,
  onPageChange,
  getPageNumbers
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex items-center justify-between flex-shrink-0">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <UserPlus className="w-6 h-6" />
              Thêm nhân viên phụ trách
            </h3>
            <p className="text-blue-100 text-sm mt-1">
              {filteredStaff.length} nhân viên khả dụng
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors hover:bg-white/10 rounded-lg p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b bg-gray-50 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors font-medium"
            />
          </div>

          {/* Quick Stats */}
          {searchQuery && (
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                {filteredStaff.length} kết quả
              </span>
            </div>
          )}
        </div>

        {/* Staff List with Pagination */}
        <div className="flex-1 overflow-y-auto">
          {filteredStaff.length === 0 ? (
            <div className="text-center py-12 px-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium mb-1">
                Không tìm thấy nhân viên
              </p>
              <p className="text-gray-400 text-sm">
                {searchQuery
                  ? "Thử tìm kiếm với từ khóa khác"
                  : "Tất cả nhân viên đã được phân công"}
              </p>
            </div>
          ) : (
            <div className="p-6">
              <div className="space-y-3">
                {paginatedStaff.map((staff) => (
                  <div
                    key={staff.id}
                    onClick={() => onAddStaff([staff.id])}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 border-2 border-transparent transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg transition-shadow flex-shrink-0">
                      {staff.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                        {staff.fullName}
                      </p>
                    </div>
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
                      <UserPlus className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {filteredStaff.length > itemsPerPage && (
          <div className="border-t bg-gray-50 p-4 flex items-center justify-between flex-shrink-0">
            <div className="text-sm text-gray-600">
              Hiển thị {startIndex + 1}-
              {Math.min(endIndex, filteredStaff.length)} trên{" "}
              {filteredStaff.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Trước
              </button>

              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum, idx) =>
                  pageNum === "..." ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-2 text-gray-400"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange(Number(pageNum))}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() =>
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};