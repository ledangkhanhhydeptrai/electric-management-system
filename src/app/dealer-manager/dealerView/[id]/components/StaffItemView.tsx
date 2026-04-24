// components/dealer-detail-view/StaffItemView.tsx
import React from "react";
import { Shield } from "lucide-react";
import { DealerStaffResponse } from "./types";

interface StaffItemViewProps {
  staff: DealerStaffResponse;
  // deleteConfirm: string | null;
  // onRemove: (staffId: string) => void;
}

export const StaffItemView: React.FC<StaffItemViewProps> = ({
  staff
  // deleteConfirm,
  // onRemove
}) => {
  return (
    <div className="p-4 rounded-xl transition-all bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 hover:shadow-md group">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0 group-hover:shadow-lg transition-shadow">
            {staff.fullName.charAt(0).toUpperCase()}
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-base truncate">
                {staff.fullName}
              </p>
            </div>

            {/* Role Badge */}
            <div className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-semibold flex-shrink-0">
              <Shield className="w-3 h-3" />
              <span>Quản lý</span>
            </div>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      {/* <div className="mt-3 pt-3 border-t border-blue-200">
        <button
          onClick={() => onRemove(staff.id)}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            deleteConfirm === staff.id
              ? "bg-red-600 text-white hover:bg-red-700 shadow-md scale-105"
              : "bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400"
          }`}
        >
          <Trash2 className="w-4 h-4" />
          {deleteConfirm === staff.id
            ? "Click lại để xác nhận xóa"
            : "Xóa nhân viên"}
        </button>
      </div> */}
    </div>
  );
};
