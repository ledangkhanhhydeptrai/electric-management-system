import React from "react";
import { Battery, Users, Gauge, Sparkles } from "lucide-react";
import { Car } from "../../types";
import { formatNumber } from "../constant/car-detail-constant";

interface QuickStatsCardProps {
  data: Car;
}

export const QuickStatsCard: React.FC<QuickStatsCardProps> = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 border border-gray-600 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-yellow-400" />
        Thông số nổi bật
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-gray-600">
          <div className="flex items-center gap-3">
            <Battery className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-300 font-medium">Dung lượng pin</span>
          </div>
          <span className="text-white text-xl font-bold">
            {data.batteryKwh} kWh
          </span>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-gray-600">
          <div className="flex items-center gap-3">
            <Gauge className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300 font-medium">Quãng đường</span>
          </div>
          <span className="text-white text-xl font-bold">
            {formatNumber(data.rangeKm)} km
          </span>
        </div>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300 font-medium">Chỗ ngồi</span>
          </div>
          <span className="text-white text-xl font-bold">{data.seat} chỗ</span>
        </div>
      </div>
    </div>
  );
};
