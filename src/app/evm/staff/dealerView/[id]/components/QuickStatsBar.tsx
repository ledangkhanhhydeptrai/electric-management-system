import React from "react";
import { Activity, Package, TrendingUp } from "lucide-react";

export const QuickStatsBar: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
      <div className="p-6 text-center hover:bg-gray-50 transition-colors">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <span className="text-xs font-bold text-gray-500 uppercase">
            Trạng thái
          </span>
        </div>
        <p className="text-xl font-bold text-green-600">Hoạt động</p>
      </div>
      <div className="p-6 text-center hover:bg-gray-50 transition-colors">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Package className="w-5 h-5 text-purple-600" />
          <span className="text-xs font-bold text-gray-500 uppercase">
            Đơn hàng
          </span>
        </div>
        <p className="text-xl font-bold text-gray-900">0</p>
      </div>
      <div className="p-6 text-center hover:bg-gray-50 transition-colors">
        <div className="flex items-center justify-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-orange-600" />
          <span className="text-xs font-bold text-gray-500 uppercase">
            Doanh thu
          </span>
        </div>
        <p className="text-xl font-bold text-gray-900">0đ</p>
      </div>
    </div>
  );
};
