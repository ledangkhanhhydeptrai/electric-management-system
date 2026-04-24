import React from "react";
import {
  Calendar,
  CalendarDays,
  Clock,
  BadgeCheck
} from "lucide-react";
import { Dealer } from "../../types/types";
import { formatDateTime, getRelativeTime } from "./dealer-detail-utils";


interface SystemInfoCardProps {
  dealer: Dealer;
}

export const SystemInfoCard: React.FC<SystemInfoCardProps> = ({ dealer }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        Thông tin hệ thống
      </h2>

      <div className="space-y-4">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3 items-center gap-2">
            <CalendarDays className="w-3.5 h-3.5" />
            Ngày tạo tài khoản
          </label>
          <p className="text-2xl font-bold text-gray-900 mb-3">
            {formatDateTime(dealer.createdAt)}
          </p>
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-orange-700 px-4 py-2 rounded-full text-sm font-bold border border-orange-200">
            <Clock className="w-4 h-4" />
            {getRelativeTime(dealer.createdAt)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3 items-center gap-2">
            <BadgeCheck className="w-3.5 h-3.5" />
            Trạng thái tài khoản
          </label>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-2xl font-bold text-green-700">
              Đang hoạt động
            </span>
          </div>
          <p className="text-sm text-green-600 mt-2">
            Tài khoản đang hoạt động bình thường
          </p>
        </div>
      </div>
    </div>
  );
};