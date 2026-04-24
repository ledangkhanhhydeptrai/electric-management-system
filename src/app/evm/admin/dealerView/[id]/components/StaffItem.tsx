// components/dealer-detail/StaffItem.tsx
import React, { useState } from "react";
import { Trash2, MoreVertical } from "lucide-react";
import { DealerStaffResponse } from "./types";

interface StaffItemProps {
  staff: DealerStaffResponse;
  deleteConfirm: string | null;
  onRemove: (staffId: string) => void;
}

export const StaffItem: React.FC<StaffItemProps> = ({
  staff,
  deleteConfirm,
  onRemove
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
      <div className="p-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-shadow">
              {staff.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-900 text-lg truncate group-hover:text-blue-600 transition-colors">
              {staff.fullName}
            </h4>
          </div>

          {/* Actions Button */}
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Quick Actions (visible on hover or click) */}
        {showActions && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 animate-fadeIn">
            {/* Contact Info - if available */}
            {/* <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <span>email@example.com</span>
            </div> */}

            {/* Remove Button */}
            <button
              onClick={() => onRemove(staff.id)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                deleteConfirm === staff.id
                  ? "bg-red-600 text-white hover:bg-red-700 shadow-lg scale-105"
                  : "bg-red-50 border-2 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-400"
              }`}
            >
              <Trash2 className="w-4 h-4" />
              {deleteConfirm === staff.id
                ? "Nhấn lại để xác nhận xóa"
                : "Xóa khỏi đại lý"}
            </button>
          </div>
        )}
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
    </div>
  );
};
