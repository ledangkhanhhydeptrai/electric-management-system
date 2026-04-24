"use client";
import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  User,
  Car,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Edit2,
  Trash2,
  Package
} from "lucide-react";

// ===== Interface =====
export interface Order {
  id: string;
  customer: string;
  carModel: string;
  price: number;
  status: "Pending" | "Completed" | "Cancelled";
  orderDate: string;
}

interface Props {
  orders: Order[];
}

// ===== Component format giá tiền trên client =====
const FormattedPrice: React.FC<{ value: number }> = ({ value }) => {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    setFormatted(value.toLocaleString("vi-VN"));
  }, [value]);

  return <span>{formatted}</span>;
};

// ===== OrdersTable Component =====
const OrdersTable: React.FC<Props> = ({ orders }) => {
  const getStatusConfig = (
    status: Order["status"]
  ): {
    color: string;
    bgColor: string;
    icon: React.ReactNode;
    label: string;
  } => {
    switch (status) {
      case "Completed":
        return {
          color: "text-green-700",
          bgColor: "bg-green-100",
          icon: <CheckCircle2 size={16} className="text-green-700" />,
          label: "Hoàn thành"
        };
      case "Pending":
        return {
          color: "text-yellow-700",
          bgColor: "bg-yellow-100",
          icon: <Clock size={16} className="text-yellow-700" />,
          label: "Đang xử lý"
        };
      case "Cancelled":
        return {
          color: "text-red-700",
          bgColor: "bg-red-100",
          icon: <XCircle size={16} className="text-red-700" />,
          label: "Đã hủy"
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-gray-100 p-6 rounded-full">
            <Package className="text-gray-400" size={48} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Chưa có đơn hàng</h3>
          <p className="text-gray-500">Đơn hàng của bạn sẽ xuất hiện ở đây</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Header */}
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <ShoppingCart size={16} className="text-blue-600" />
                  Mã đơn
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <User size={16} className="text-purple-600" />
                  Khách hàng
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <Car size={16} className="text-indigo-600" />
                  Mẫu xe
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <DollarSign size={16} className="text-green-600" />
                  Giá
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <CheckCircle2 size={16} className="text-orange-600" />
                  Trạng thái
                </div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <Calendar size={16} className="text-pink-600" />
                  Ngày đặt
                </div>
              </th>
              <th className="px-6 py-4 text-center">
                <div className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Thao tác
                </div>
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100 bg-white">
            {orders.map((order, index) => {
              const statusConfig = getStatusConfig(order.status);
              return (
                <tr
                  key={order.id}
                  className={`hover:bg-gray-50 transition-all duration-200 group ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  {/* Order ID */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <ShoppingCart size={16} className="text-blue-600" />
                      </div>
                      <span className="font-bold text-gray-900">
                        {order.id}
                      </span>
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        {order.customer.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-gray-900">
                        {order.customer}
                      </span>
                    </div>
                  </td>

                  {/* Car Model */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Car size={16} className="text-indigo-600" />
                      <span className="text-gray-700 font-medium">
                        {order.carModel}
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-green-600">
                        <FormattedPrice value={order.price} />
                      </span>
                      <span className="text-xs text-gray-500">VNĐ</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${
                        statusConfig.bgColor
                      } border ${statusConfig.bgColor.replace(
                        "bg-",
                        "border-"
                      )}`}
                    >
                      {statusConfig.icon}
                      <span
                        className={`text-sm font-bold ${statusConfig.color}`}
                      >
                        {statusConfig.label}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-700 font-medium">
                        {formatDate(order.orderDate)}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group/btn"
                        title="Xem chi tiết"
                      >
                        <Eye
                          size={18}
                          className="text-gray-400 group-hover/btn:text-blue-600 transition-colors"
                        />
                      </button>
                      <button
                        className="p-2 hover:bg-green-50 rounded-lg transition-colors group/btn"
                        title="Chỉnh sửa"
                      >
                        <Edit2
                          size={18}
                          className="text-gray-400 group-hover/btn:text-green-600 transition-colors"
                        />
                      </button>
                      <button
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group/btn"
                        title="Xóa"
                      >
                        <Trash2
                          size={18}
                          className="text-gray-400 group-hover/btn:text-red-600 transition-colors"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
