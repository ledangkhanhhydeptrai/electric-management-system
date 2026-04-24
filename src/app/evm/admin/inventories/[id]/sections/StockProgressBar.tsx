import React from "react";

interface StockProgressBarProps {
  available: number;
  qtyOnHand: number;
  availablePercentage: string;
}

export const StockProgressBar: React.FC<StockProgressBarProps> = ({
  available,
  qtyOnHand,
  availablePercentage
}) => {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border-2 border-white/40 hover:shadow-2xl hover:shadow-white/20 hover:border-white/60 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className="text-white font-black text-xl drop-shadow-2xl">
          Tỷ lệ hàng khả dụng
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-300 font-black text-4xl drop-shadow-2xl animate-pulse">
          {availablePercentage}%
        </span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-5 overflow-hidden shadow-inner border border-white/30">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 rounded-full transition-all duration-1000 shadow-2xl shadow-cyan-400/50 relative overflow-hidden"
          style={{ width: `${availablePercentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <span className="text-white font-bold text-sm">
          <span className="text-2xl font-black">{available}</span> khả dụng
        </span>
        <span className="text-white font-bold text-sm">
          <span className="text-2xl font-black">{qtyOnHand}</span> tổng
        </span>
      </div>
    </div>
  );
};