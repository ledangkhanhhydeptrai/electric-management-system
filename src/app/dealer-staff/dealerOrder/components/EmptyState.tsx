import React from "react";
import { Package } from "lucide-react";

const EmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-12 text-center backdrop-blur-lg bg-opacity-90">
      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500 text-lg">Không tìm thấy đơn hàng nào</p>
    </div>
  );
};

export default EmptyState;
