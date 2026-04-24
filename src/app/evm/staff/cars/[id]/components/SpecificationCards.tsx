import React from "react";
import { Battery, Users, Gauge, Zap, TrendingUp, Sparkles } from "lucide-react";
import { Car } from "../../types";
import { formatNumber } from "../constant/car-detail-constant";


interface SpecificationCardsProps {
  data: Car;
}

export const SpecificationCards: React.FC<SpecificationCardsProps> = ({
  data
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Battery */}
      <div className="group bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 shadow-xl transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white border-opacity-30 transform group-hover:scale-110 group-hover:rotate-12 transition-all">
            <Battery className="w-8 h-8 text-white" />
          </div>
          <Zap className="w-6 h-6 text-yellow-200 animate-pulse" />
        </div>
        <p className="text-yellow-100 text-sm font-bold uppercase tracking-wide mb-3">
          Dung lượng pin
        </p>
        <div className="flex items-baseline gap-2">
          <p className="text-5xl font-black text-white">{data.batteryKwh}</p>
          <p className="text-2xl font-bold text-yellow-100">kWh</p>
        </div>
        <div className="mt-4 h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full animate-pulse"
            style={{ width: "85%" }}
          />
        </div>
      </div>

      {/* Range */}
      <div className="group bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 shadow-xl transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white border-opacity-30 transform group-hover:scale-110 group-hover:rotate-12 transition-all">
            <Gauge className="w-8 h-8 text-white" />
          </div>
          <TrendingUp className="w-6 h-6 text-purple-200 animate-pulse" />
        </div>
        <p className="text-purple-100 text-sm font-bold uppercase tracking-wide mb-3">
          Quãng đường
        </p>
        <div className="flex items-baseline gap-2">
          <p className="text-5xl font-black text-white">
            {formatNumber(data.rangeKm)}
          </p>
          <p className="text-2xl font-bold text-purple-100">km</p>
        </div>
        <div className="mt-4 h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full animate-pulse"
            style={{ width: "90%" }}
          />
        </div>
      </div>

      {/* Seats */}
      <div className="group bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 shadow-xl transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white border-opacity-30 transform group-hover:scale-110 group-hover:rotate-12 transition-all">
            <Users className="w-8 h-8 text-white" />
          </div>
          <Sparkles className="w-6 h-6 text-blue-200 animate-pulse" />
        </div>
        <p className="text-blue-100 text-sm font-bold uppercase tracking-wide mb-3">
          Số chỗ ngồi
        </p>
        <div className="flex items-baseline gap-2">
          <p className="text-5xl font-black text-white">{data.seat}</p>
          <p className="text-2xl font-bold text-blue-100">chỗ</p>
        </div>
        <div className="mt-4 flex gap-1">
          {Array.from({ length: data.seat }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-2 bg-white bg-opacity-40 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
