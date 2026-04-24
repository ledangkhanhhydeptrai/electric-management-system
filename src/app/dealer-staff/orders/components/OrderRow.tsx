import React from "react";
import { Eye, Edit2, XCircle } from "lucide-react";
import { formatCurrency, formatDate } from "../utils/order.util";
import StatusBadge from "./StatusBadge";
import { OrderData } from "@/services/orderService/order";

interface OrderRowProps {
  order: OrderData;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onShowDiscount: (
    orderId: string,
    itemId: string,
    quantity: number,
    discountAmount: number
  ) => void;
  onDeleteItem: (orderId: string, itemId: string) => void;
}

const OrderRow: React.FC<OrderRowProps> = ({
  onShowDiscount,
  order,
  onView,
  onEdit,
  onDeleteItem
}) => {
  return (
    <>
      {/* Mã đơn hàng - Với animated dot */}
      <td className="px-3 py-2.5 whitespace-nowrap">
        <div className="flex items-center gap-2 group">
          <div className="relative">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping"></div>
          </div>
          <div>
            <div className="text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-all">
              {order.orderNo}
            </div>
            <div className="text-[9px] text-gray-400 font-mono">
              #{order.id.slice(0, 8)}
            </div>
          </div>
        </div>
      </td>

      {/* Khách hàng - Avatar với gradient */}
      <td className="px-3 py-2.5 whitespace-nowrap">
        <div className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 border-2 border-white">
              <span className="text-[10px] font-bold text-white drop-shadow-sm">
                {order.customerName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
              {order.customerName}
            </div>
            <div className="text-[9px] text-gray-500 font-medium">
              Khách hàng
            </div>
          </div>
        </div>
      </td>

      {/* Đại lý - Modern icon box */}
      <td className="px-3 py-2.5 whitespace-nowrap">
        <div className="flex items-center gap-2 group">
          <div className="relative">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300 border border-purple-100">
              <svg
                className="w-3 h-3 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-medium text-gray-900 group-hover:text-purple-700 transition-colors">
              {order.dealerName}
            </div>
            <div className="text-[9px] text-gray-500 font-medium">Đại lý</div>
          </div>
        </div>
      </td>

      {/* Nhân viên */}
      <td className="px-3 py-2.5 whitespace-nowrap">
        <div className="flex items-center gap-2 group">
          <div className="w-6 h-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300 border border-green-100">
            <svg
              className="w-3 h-3 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <div className="text-[11px] font-medium text-gray-900 group-hover:text-green-700 transition-colors">
              {order.staffName}
            </div>
            <div className="text-[9px] text-gray-500 font-medium">
              Nhân viên
            </div>
          </div>
        </div>
      </td>

      {/* Tổng tiền - Highlighted */}
      <td className="px-3 py-2.5 whitespace-nowrap">
        <div className="flex items-center gap-2 group">
          <div className="w-6 h-6 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300 border border-emerald-100">
            <svg
              className="w-3 h-3 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <div className="text-[11px] font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {formatCurrency(order.totalPrice)}
            </div>
            <div className="text-[9px] text-gray-500 font-medium">VNĐ</div>
          </div>
        </div>
      </td>

      {/* Ngày đặt */}
      <td className="px-3 py-2.5 whitespace-nowrap">
        <div className="flex items-center gap-2 group">
          <div className="w-6 h-6 bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300 border border-amber-100">
            <svg
              className="w-3 h-3 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <div className="text-[11px] font-medium text-gray-900 group-hover:text-amber-700 transition-colors">
              {formatDate(order.orderDate)}
            </div>
          </div>
        </div>
      </td>

      {/* Trạng thái */}
      <td className="px-3 py-2.5 whitespace-nowrap">
        <StatusBadge status={order.status} onEdit={() => onEdit(order.id)} />
      </td>

      {/* Actions - Redesigned với gradient */}
      <td className="px-3 py-2.5 whitespace-nowrap">
        <div className="flex items-center justify-center gap-1.5">
          {/* Nút Xem chi tiết */}
          <button
            onClick={() => onView(order.id)}
            className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            title="Xem chi tiết"
          >
            <Eye className="w-3.5 h-3.5" />
            <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
          </button>

          {/* Nút Chỉnh sửa */}
          <button
            onClick={() =>
              onShowDiscount?.(
                order.id,
                order.items[0].id,
                order.items[0].quantity,
                order.items[0].discountAmount
              )
            }
            className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            title="Chỉnh sửa"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
          </button>

          {/* Nút Xóa Item */}
          {onDeleteItem && order.items && order.items.length > 0 && (
            <button
              onClick={() => onDeleteItem(order.id, order.items[0].id)}
              className="group relative p-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
              title="Xóa item"
            >
              <XCircle className="w-3.5 h-3.5" />
              <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
            </button>
          )}
        </div>
      </td>

      {/* Inline styles for animations */}
      <style jsx>{`
        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </>
  );
};

export default OrderRow;
