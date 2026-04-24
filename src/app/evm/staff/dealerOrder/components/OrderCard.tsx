import React from "react";
import {
  Calendar,
  User,
  Package,
  ChevronDown,
  ChevronUp,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Ban
} from "lucide-react";
import { DealerOrderData } from "@/services/dealerOrderService/dealerOrder";
import { StatusBadge, formatDate, getTotalQuantity } from "./utils";
import { OrderItemsTable } from "./OrderItemsTable";

interface OrderCardProps {
  order: DealerOrderData;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onViewDetail: () => void;
  onQuickApprove: () => void;
  onQuickReject: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  isExpanded,
  onToggleExpand,
  onViewDetail,
  onQuickApprove,
  onQuickReject,
  onApprove,
  onReject
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl backdrop-blur-lg bg-opacity-90">
      {/* Order Header */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-xl font-bold text-gray-800">
                {order.dealerName}
              </h3>

              <StatusBadge status={order.status} />

              {/* Quick Action Buttons cho REQUESTED */}
              {order.status === "REQUESTED" && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickApprove();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl hover:from-green-600 hover:to-emerald-700"
                    title="Phê duyệt nhanh"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Duyệt nhanh</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickReject();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-semibold bg-gradient-to-r from-red-500 to-rose-600 shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl hover:from-red-600 hover:to-rose-700"
                    title="Từ chối nhanh"
                  >
                    <Ban className="w-4 h-4" />
                    <span>Từ chối nhanh</span>
                  </button>
                </>
              )}
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
          {/* Items Table */}
          <OrderItemsTable items={order.items} />

          {/* Action Buttons for REQUESTED orders */}
          {order.status === "REQUESTED" && (
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button
                onClick={onReject}
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
              >
                <ThumbsDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Từ chối đơn hàng
              </button>
              <button
                onClick={onApprove}
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
              >
                <ThumbsUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Phê duyệt đơn hàng
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};