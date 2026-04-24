import React from "react";
import { Plus } from "lucide-react";

interface OrderHeaderProps {
  onCreateOrder: () => void;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({ onCreateOrder }) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Quản Lý Đơn Hàng Đại Lý
        </h1>
        <p className="text-gray-600">
          Theo dõi và quản lý đơn hàng từ các đại lý
        </p>
      </div>
      <button
        onClick={onCreateOrder}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-semibold transform"
      >
        <Plus className="w-5 h-5" />
        Tạo đơn hàng mới
      </button>
    </div>
  );
};

export default OrderHeader;