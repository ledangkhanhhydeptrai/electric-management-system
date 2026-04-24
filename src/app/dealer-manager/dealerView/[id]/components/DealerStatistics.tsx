// components/dealer-detail-view/DealerStatistics.tsx
import React from "react";
import { Building2 } from "lucide-react";

export const DealerStatistics: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Building2 className="w-6 h-6 text-blue-600" />
        Thống kê
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
          <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
          <p className="text-sm text-gray-600 font-medium">Đơn hàng</p>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200">
          <div className="text-3xl font-bold text-green-600 mb-2">0đ</div>
          <p className="text-sm text-gray-600 font-medium">Doanh thu</p>
        </div>
      </div>
    </div>
  );
};