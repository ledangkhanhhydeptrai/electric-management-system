import React from "react";
import {
  Edit2,
  Trash2,
  Users,
  Briefcase,
  MapPin,
  Building2
} from "lucide-react";
import { Staff } from "@/services/staffService/staff";

interface StaffTableProps {
  staffs: Staff[];
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  onEdit: (staff: Staff) => void;
  onDelete: (id: string) => void;
}

export default function StaffTable({
  staffs,
  currentPage,
  pageSize,
  isLoading,
  onEdit,
  onDelete
}: StaffTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              STT
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Họ và Tên
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              <div className="flex items-center justify-center gap-2">
                <Briefcase className="w-4 h-4" /> Chức vụ
              </div>
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" /> Vị trí
              </div>
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              <div className="flex items-center justify-center gap-2">
                <Building2 className="w-4 h-4" /> Nơi làm việc
              </div>
            </th>
            <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
              Thao Tác
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {staffs.length > 0 ? (
            staffs.map((staff, index) => (
              <tr
                key={staff.id}
                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
              >
                {/* STT */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg text-sm font-bold">
                    {currentPage * pageSize + index + 1}
                  </div>
                </td>

                {/* Họ và Tên */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                      {staff.fullName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-base text-gray-900 font-semibold">
                      {staff.fullName}
                    </span>
                  </div>
                </td>

                {/* Chức vụ */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                    <Briefcase className="w-3.5 h-3.5" /> {staff.title}
                  </span>
                </td>

                {/* Vị trí */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
                    <MapPin className="w-3.5 h-3.5" /> {staff.position}
                  </span>
                </td>

                {/* Nơi làm việc */}
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span
                      className={`text-sm font-medium ${
                        staff.workLocation
                          ? "text-gray-700"
                          : "text-gray-400 italic"
                      }`}
                    >
                      {staff.workLocation || "Chưa phân công"}
                    </span>
                  </div>
                </td>

                {/* Thao Tác */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(staff)}
                      className="group p-2.5 bg-blue-50 border-2 border-blue-200 rounded-lg text-blue-600 hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-300 hover:scale-110"
                      title="Chỉnh sửa"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(staff.id)}
                      className="group p-2.5 bg-red-50 border-2 border-red-200 rounded-lg text-red-600 hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300 hover:scale-110"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg font-medium">
                    Không tìm thấy nhân viên nào
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Thử tìm kiếm với từ khóa khác hoặc thêm nhân viên mới
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
