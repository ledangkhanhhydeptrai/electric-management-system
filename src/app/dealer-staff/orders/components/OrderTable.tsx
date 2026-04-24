import React, { useState } from "react";
import OrderRow from "./OrderRow";
import Pagination from "./Pagination";
import StatusPopup from "./StatusPopup";
import { OrderData } from "@/services/orderService/order";
import {
  Package,
  TrendingUp,
  Clock,
  Sparkles,
  ShoppingCart
} from "lucide-react";

interface OrderTableProps {
  orders: OrderData[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onView: (id: string) => void;
  onEdit: (id: string, newStatus: string) => void;
  onShowDiscount: (
    orderId: string,
    itemId: string,
    quantity: number,
    discountAmount: number
  ) => void;
  onDeleteItem: (orderId: string, itemId: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  onShowDiscount,
  orders,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onView,
  onEdit,
  onDeleteItem
}) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleEdit = (id: string) => {
    const order = orders.find((o) => o.id === id);
    if (order) {
      setSelectedOrder(order);
      setIsPopupOpen(true);
    }
  };

  const handleSaveStatus = (newStatus: string) => {
    if (selectedOrder) {
      onEdit(selectedOrder.id, newStatus);
    }
    setIsPopupOpen(false);
  };

  // Empty state - Cực kỳ đẹp
  if (orders.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center py-20 px-4">
          {/* Animated icon container */}
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-pulse"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
              <ShoppingCart className="w-12 h-12 text-white animate-bounce" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white text-xs font-bold">0</span>
              </div>
            </div>
            {/* Sparkle effects */}
            <Sparkles className="absolute -top-3 -left-3 w-6 h-6 text-yellow-400 animate-ping" />
            <Sparkles className="absolute -bottom-3 -right-3 w-5 h-5 text-blue-400 animate-ping delay-75" />
          </div>

          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-3">
            Chưa có đơn hàng nào
          </h3>
          <p className="text-sm text-gray-600 text-center max-w-md mb-8 leading-relaxed">
            Hệ thống đang chờ đơn hàng đầu tiên. Đơn hàng mới sẽ xuất hiện ngay
            tại đây!
          </p>

          {/* Info cards */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-100">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-gray-700">
                Đang chờ dữ liệu
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-100">
              <Package className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-medium text-gray-700">
                0 đơn hàng
              </span>
            </div>
          </div>

          {/* Animated dots */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header với gradient cực đẹp */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-5 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-grid-white opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5"></div>

        {/* Floating shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl"></div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Icon container với animation */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300"></div>
              <div className="relative w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl border border-white/30 group-hover:scale-110 transition-transform duration-300">
                <Package className="w-6 h-6 text-white drop-shadow-lg" />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2 drop-shadow-md">
                Danh sách đơn hàng
                <span className="px-2.5 py-1 bg-white/20 backdrop-blur-xl rounded-full text-xs font-bold border border-white/30 shadow-lg">
                  {orders.length}
                </span>
              </h2>
              <p className="text-xs text-blue-100 flex items-center gap-1.5 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                Quản lý và theo dõi đơn hàng của bạn
              </p>
            </div>
          </div>

          {/* Statistics badges - Đẹp hơn */}
          <div className="hidden md:flex items-center gap-3">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-200">
              <div className="text-[10px] text-blue-200 font-medium mb-0.5">
                Trang hiện tại
              </div>
              <span className="text-sm font-bold text-white">
                {currentPage}/{totalPages}
              </span>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-200">
              <div className="text-[10px] text-blue-200 font-medium mb-0.5">
                Tổng đơn
              </div>
              <span className="text-sm font-bold text-white">
                {orders.length} đơn
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Table - Modern và compact */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 via-blue-50/30 to-indigo-50/30 backdrop-blur-sm border-y border-gray-200/50">
            <tr>
              <th className="px-3 py-2.5 text-left text-[10px] font-extrabold text-gray-700 uppercase tracking-wide">
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                  <span>Mã đơn</span>
                </div>
              </th>
              <th className="px-3 py-2.5 text-left text-[10px] font-extrabold text-gray-700 uppercase tracking-wide">
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-3 h-3 text-blue-500"
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
                  <span>Khách hàng</span>
                </div>
              </th>
              <th className="px-3 py-2.5 text-left text-[10px] font-extrabold text-gray-700 uppercase tracking-wide">
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-3 h-3 text-purple-500"
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
                  <span>Đại lý</span>
                </div>
              </th>
              <th className="px-3 py-2.5 text-left text-[10px] font-extrabold text-gray-700 uppercase tracking-wide">
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-3 h-3 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Nhân viên</span>
                </div>
              </th>
              <th className="px-3 py-2.5 text-left text-[10px] font-extrabold text-gray-700 uppercase tracking-wide">
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-3 h-3 text-emerald-500"
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
                  <span>Tổng tiền</span>
                </div>
              </th>
              <th className="px-3 py-2.5 text-left text-[10px] font-extrabold text-gray-700 uppercase tracking-wide">
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-3 h-3 text-amber-500"
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
                  <span>Ngày đặt</span>
                </div>
              </th>
              <th className="px-3 py-2.5 text-left text-[10px] font-extrabold text-gray-700 uppercase tracking-wide">
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-3 h-3 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Trạng thái</span>
                </div>
              </th>
              <th className="px-3 py-2.5 text-center text-[10px] font-extrabold text-gray-700 uppercase tracking-wide">
                <span>Thao tác</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 transition-all duration-200 group"
                style={{
                  animation: `fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${
                    index * 0.05
                  }s both`
                }}
              >
                <OrderRow
                  order={order}
                  onView={onView}
                  onEdit={handleEdit}
                  onShowDiscount={onShowDiscount}
                  onDeleteItem={onDeleteItem}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination với styling cực đẹp */}
      <div className="relative bg-gradient-to-r from-gray-50 via-blue-50/20 to-indigo-50/20 border-t border-gray-200/50 px-6 py-4 backdrop-blur-sm">
        <div className="absolute inset-0 bg-grid-gray opacity-5"></div>
        <div className="relative">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={orders.length}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>

      {/* Popup chọn trạng thái */}
      <StatusPopup
        isOpen={isPopupOpen}
        currentStatus={selectedOrder?.status || "PENDING"}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSaveStatus}
      />

      {/* CSS Animations & Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .bg-grid-white {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .bg-grid-gray {
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        /* Custom scrollbar */
        .overflow-x-auto::-webkit-scrollbar {
          height: 8px;
        }

        .overflow-x-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #3b82f6 0%, #6366f1 100%);
          border-radius: 10px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, #2563eb 0%, #4f46e5 100%);
        }
      `}</style>
    </div>
  );
};

export default OrderTable;
