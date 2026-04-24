import React from "react";
import { TrendingUp, Package } from "lucide-react";

export const StatisticsCards: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        Thống kê chi tiết
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                <Package className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold uppercase opacity-90">
                Tổng đơn hàng
              </p>
            </div>
            <p className="text-4xl font-bold mb-2">0</p>
            <p className="text-sm opacity-80">Đơn hàng đã tạo</p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold uppercase opacity-90">
                Doanh thu
              </p>
            </div>
            <p className="text-4xl font-bold mb-2">0₫</p>
            <p className="text-sm opacity-80">Tổng doanh thu</p>
          </div>
        </div>
      </div>
    </div>
  );
};
