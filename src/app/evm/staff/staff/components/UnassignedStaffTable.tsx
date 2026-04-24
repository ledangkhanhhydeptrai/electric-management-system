import React from "react";
import { UserX, Mail, Calendar } from "lucide-react";

export interface UnassignedStaff {
  id: string;
  fullName: string;
}

interface UnassignedStaffTableProps {
  staffs: UnassignedStaff[];
  isLoading: boolean;
  onAssign?: (staffId: string) => void;
}

export default function UnassignedStaffTable({
  staffs,
  isLoading,
  onAssign
}: UnassignedStaffTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!staffs || staffs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-4">
          <UserX className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Tất cả nhân viên đã được phân công
        </h3>
        <p className="text-gray-500">Không có nhân viên chưa được phân công</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-orange-50 to-amber-50 border-b-2 border-orange-200">
            <th className="px-6 py-4 text-left">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                STT
              </div>
            </th>
            <th className="px-6 py-4 text-left">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
                <UserX className="w-4 h-4 text-orange-600" />
                Họ và Tên
              </div>
            </th>
            <th className="px-6 py-4 text-left">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
                <Mail className="w-4 h-4 text-orange-600" />
                ID Nhân Viên
              </div>
            </th>
            <th className="px-6 py-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-orange-600" />
                Trạng Thái
              </div>
            </th>
            {onAssign && (
              <th className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Hành Động
                </div>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {staffs.map((staff, index) => (
            <tr
              key={staff.id}
              className="hover:bg-orange-50/50 transition-all duration-200 group"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 text-orange-700 font-bold text-sm group-hover:scale-110 transition-transform">
                    {index + 1}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow">
                    {staff.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                      {staff.fullName}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <code className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-mono border border-gray-200">
                  {staff.id}
                </code>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border border-orange-200 shadow-sm">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                    Chưa Phân Công
                  </span>
                </div>
              </td>
              {onAssign && (
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onAssign(staff.id)}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      Phân Công
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
