import React from "react";
import {
  Archive,
  CheckCircle,
  ShoppingCart,
  Truck
} from "lucide-react";
import { StatsCard } from "../shared/StatsCard";

interface StatsGridProps {
  qtyOnHand: number;
  available: number;
  qtyReserved: number;
  qtyIncoming: number;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  qtyOnHand,
  available,
  qtyReserved,
  qtyIncoming
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Qty On Hand */}
      <StatsCard
        title="Tồn kho"
        value={qtyOnHand}
        description="Tổng số xe trong kho"
        icon={Archive}
        gradientFrom="from-blue-500/20"
        gradientTo="to-cyan-500/20"
        borderColor="border-blue-400/40"
        shadowColor="hover:shadow-cyan-500/40"
      />

      {/* Available */}
      <StatsCard
        title="Khả dụng"
        value={available}
        description="Xe sẵn sàng bán"
        icon={CheckCircle}
        gradientFrom="from-emerald-500/20"
        gradientTo="to-teal-500/20"
        borderColor="border-emerald-400/40"
        shadowColor="hover:shadow-emerald-500/40"
      />

      {/* Reserved */}
      <StatsCard
        title="Đã đặt"
        value={qtyReserved}
        description="Xe đã được đặt trước"
        icon={ShoppingCart}
        gradientFrom="from-orange-500/20"
        gradientTo="to-rose-500/20"
        borderColor="border-orange-400/40"
        shadowColor="hover:shadow-rose-500/40"
      />

      {/* Incoming */}
      <StatsCard
        title="Đang về"
        value={qtyIncoming}
        description="Xe đang trên đường về"
        icon={Truck}
        gradientFrom="from-purple-500/20"
        gradientTo="to-fuchsia-500/20"
        borderColor="border-purple-400/40"
        shadowColor="hover:shadow-fuchsia-500/40"
      />
    </div>
  );
};