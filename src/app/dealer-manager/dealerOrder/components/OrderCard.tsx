import React from "react";
import {
  User,
  Calendar,
  Package,
  ChevronDown,
  ChevronUp,
  Eye
} from "lucide-react";
import { DealerOrderData } from "@/services/dealerOrderService/dealerOrder";
import StatusBadge from "./StatusBadge";
import OrderItemsTable from "./OrderItemsTable";
import { formatDate, getTotalQuantity } from "./Utils";


interface OrderCardProps {
  order: DealerOrderData;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onViewDetail: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  isExpanded,
  onToggleExpand,
  onViewDetail
}) => {

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl backdrop-blur-lg bg-opacity-90">
      {/* Order Header */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-800">
                {order.dealerName}
              </h3>
              <StatusBadge status={order.status} />
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>NV: {order.staffName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Ngày tạo: {formatDate(order.createdAtOrder)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span>Tổng SL: {getTotalQuantity(order.items)} xe</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onViewDetail}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl font-medium"
            >
              <Eye className="w-5 h-5" />
              Xem chi tiết
            </button>
            <button
              onClick={onToggleExpand}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-5 h-5" />
                  Thu gọn
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5" />
                  Mở rộng
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Order Details - Expanded */}
      {isExpanded && (
        <div className="p-6 space-y-6 animate-fadeIn">
          <OrderItemsTable items={order.items} />
        </div>
      )}
    </div>
  );
};

export default OrderCard;