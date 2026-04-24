import React from "react";
import { Car, Package, DollarSign, Battery } from "lucide-react";

interface StatsCardsProps {
  totalModels: number;
  totalVersions: number;
  avgPrice: number;
  avgRange: number;
}

export default function StatsCards({
  totalModels,
  totalVersions,
  avgPrice,
  avgRange
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-600 text-sm">Tổng Models</p>
          <Car className="w-5 h-5 text-blue-600" />
        </div>
        <p className="text-3xl font-bold text-gray-800">{totalModels}</p>
        <p className="text-xs text-green-600 mt-1">+2 tháng này</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-600 text-sm">Tổng Versions</p>
          <Package className="w-5 h-5 text-green-600" />
        </div>
        <p className="text-3xl font-bold text-gray-800">{totalVersions}</p>
        <p className="text-xs text-gray-500 mt-1">
          {totalModels > 0 ? (totalVersions / totalModels).toFixed(1) : 0} trung
          bình/model
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-600 text-sm">Giá TB</p>
          <DollarSign className="w-5 h-5 text-purple-600" />
        </div>
        <p className="text-3xl font-bold text-gray-800">
          ${(avgPrice / 1000).toFixed(0)}K
        </p>
        <p className="text-xs text-gray-500 mt-1">Trung bình</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-600 text-sm">Range TB</p>
          <Battery className="w-5 h-5 text-orange-600" />
        </div>
        <p className="text-3xl font-bold text-gray-800">{avgRange} km</p>
        <p className="text-xs text-gray-500 mt-1">Trung bình</p>
      </div>
    </div>
  );
}
