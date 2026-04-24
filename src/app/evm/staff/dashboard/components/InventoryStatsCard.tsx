import React from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

interface InventoryStatsCardProps {
  total: number;
  sold: number;
}

const InventoryStatsCard: React.FC<InventoryStatsCardProps> = ({
  total,
  sold
}) => {
  const percent = Math.round((sold / total) * 100);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-r from-green-500 to-emerald-600 p-1 rounded-2xl shadow-lg text-white"
    >
      {/* Header with icon */}
      <div className="flex items-center gap-4 mb-4">
        <div className="p-4 bg-white/20 rounded-full">
          <ShoppingCart size={28} />
        </div>
        <div>
          <h3 className="text-sm opacity-80">Tồn kho</h3>
          <p className="text-xl font-bold">
            {sold}/{total} xe đã bán
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-white/20 rounded-full h-3">
        <div
          className="h-3 bg-white rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-2 text-sm opacity-80">Đã bán {percent}%</p>
    </motion.div>
  );
};

export default InventoryStatsCard;
