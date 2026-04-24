import React from "react";
import { TrendingUp, Package } from "lucide-react";
import { formatNumber } from "../shared/formatters";

interface TotalModelQuantityCardProps {
  totalModelQuantity: number;
}

export const TotalModelQuantityCard: React.FC<TotalModelQuantityCardProps> = ({
  totalModelQuantity
}) => {
  return (
    <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-6 border-2 border-yellow-400/40 hover:shadow-2xl hover:shadow-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 mb-6 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform border-2 border-yellow-300/50">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-sm text-yellow-200 font-semibold uppercase mb-1">
              Tổng tồn kho model
            </p>
            <p className="text-5xl font-black text-white drop-shadow-2xl">
              {formatNumber(totalModelQuantity)}
            </p>
          </div>
        </div>
        <Package className="w-12 h-12 text-white/30 group-hover:text-white/60 transition-colors" />
      </div>
      <p className="text-sm text-yellow-100/80 font-medium mt-4">
        Tổng số lượng xe của model này trong toàn hệ thống
      </p>
    </div>
  );
};