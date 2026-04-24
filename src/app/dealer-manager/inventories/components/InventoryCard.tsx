import React from "react";
import {
  Building2,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  Calendar,
  Package,
  Edit3,
  Trash2
} from "lucide-react";
import { InventoryItem } from "../types/types";
import { Dealer } from "../../dealerView/types/types";

interface InventoryTableProps {
  items: InventoryItem[];
  onView: (item: InventoryItem) => void;
  dealers: Dealer[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (item: InventoryItem) => void;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

const getStockStatus = (item: InventoryItem) => {
  const max = item.available || 1; // tránh chia cho 0
  const qty = item.qtyOnHand || 0;
  const percentage = qty / max * 100;

  if (percentage < 30) {
    return {
      status: "Cần nhập thêm",
      bgColor: "bg-gradient-to-r from-red-50 to-red-100",
      textColor: "text-red-700",
      dotColor: "bg-red-500",
      borderColor: "border-red-200",
      icon: <TrendingDown className="w-3.5 h-3.5" />
    };
  } else if (percentage < 70) {
    return {
      status: "Trung bình",
      bgColor: "bg-gradient-to-r from-yellow-50 to-yellow-100",
      textColor: "text-yellow-700",
      dotColor: "bg-yellow-500",
      borderColor: "border-yellow-200",
      icon: <Minus className="w-3.5 h-3.5" />
    };
  } else {
    return {
      status: "Đầy đủ",
      bgColor: "bg-gradient-to-r from-green-50 to-green-100",
      textColor: "text-green-700",
      dotColor: "bg-green-500",
      borderColor: "border-green-200",
      icon: <TrendingUp className="w-3.5 h-3.5" />
    };
  }
};

export const InventoryCard: React.FC<InventoryTableProps> = ({
  items,
  onEdit,
  onView,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
              <th className="px-6 py-5 text-left">Đại lý</th>
              <th className="px-6 py-5 text-center">Tồn kho</th>
              <th className="px-6 py-5 text-center">Tối đa</th>
              <th className="px-6 py-5 text-center">Tình trạng</th>
              <th className="px-6 py-5 text-center">Cập nhật</th>
              <th className="px-6 py-5 text-center">Hành động</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {items.map((item, index) => {
              const qtyOnHand = item.qtyOnHand || 0;
              const available = item.available || 0;
              const percentage =
                available > 0 ? (qtyOnHand / available * 100).toFixed(0) : "0";

              const stockStatus = getStockStatus({
                ...item,
                qtyOnHand,
                available
              });

              return (
                <tr
                  key={item.id}
                  className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                  style={{
                    animation: `fadeIn 0.3s ease-out ${index * 0.05}s backwards`
                  }}
                >
                  {/* Dealer Info */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-base group-hover:text-blue-700 transition-colors">
                          {item.dealerName || "N/A"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Qty */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-br from-blue-100 to-blue-50 px-4 py-2 rounded-xl border-2 border-blue-200 group-hover:shadow-md transition-shadow">
                        <span className="text-3xl font-black text-blue-600">
                          {qtyOnHand}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 font-semibold mt-2 uppercase tracking-wide">
                        xe
                      </span>
                    </div>
                  </td>

                  {/* Max */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                        <span className="text-xl font-bold text-green-600">
                          {available}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">xe</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 ${stockStatus.borderColor} ${stockStatus.bgColor} shadow-sm group-hover:shadow-md transition-shadow`}
                      >
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${stockStatus.dotColor} animate-pulse`}
                        />
                        <span
                          className={`text-xs font-bold ${stockStatus.textColor}`}
                        >
                          {stockStatus.status}
                        </span>
                        {stockStatus.icon}
                      </div>

                      {/* Progress bar */}
                      <div className="w-full max-w-[140px]">
                        <div className="relative w-full bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                          <div
                            className={`h-full transition-all duration-700 ease-out ${Number(
                              percentage
                            ) < 30
                              ? "bg-gradient-to-r from-red-500 to-red-600"
                              : Number(percentage) < 70
                                ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                                : "bg-gradient-to-r from-green-500 to-green-600"}`}
                            style={{ width: `${percentage}%` }}
                          >
                            <div className="absolute inset-0 bg-white/30 animate-pulse" />
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-1.5">
                          <span className="text-xs font-bold text-gray-700">
                            {percentage}%
                          </span>
                          <span className="text-xs text-gray-500">
                            {qtyOnHand}/{available}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Updated */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-700">
                          {formatDate(item.updatedAt)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        Tạo: {formatDate(item.createdAt)}
                      </span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                      {/* View Button */}
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onView(item);
                        }}
                        className="group/btn relative px-5 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden"
                        title="Xem chi tiết"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                        <div className="relative flex items-center gap-2">
                          <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          <span>Xem</span>
                        </div>
                      </button>

                      {/* <button
                        onClick={e => {
                          e.stopPropagation();
                          onEdit(item);
                        }}
                        className="group/btn relative px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden"
                        title="Chỉnh sửa"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                        <div className="relative flex items-center gap-2">
                          <Edit3 className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                          <span>Sửa</span>
                        </div>
                      </button>

                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onDelete(item);
                        }}
                        className="group/btn relative px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden"
                        title="Xóa"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                        <div className="relative flex items-center gap-2">
                          <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          <span>Xóa</span>
                        </div>
                      </button> */}

                      {/* Dispatch Button */}
                      {/* <button
                        onClick={onClick}
                        className="group/btn relative px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden"
                        title="Điều phối"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                        <div className="relative flex items-center gap-2">
                          <Package className="w-4 h-4 group-hover/btn:rotate-6 transition-transform" />
                          <span>Điều phối</span>
                        </div>
                      </button> */}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Empty State */}
        {items.length === 0 &&
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-3xl shadow-2xl">
                <Package className="w-20 h-20 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Chưa có dữ liệu tồn kho
            </h3>
            <p className="text-gray-600 text-center max-w-md mb-6">
              Hiện tại chưa có thông tin tồn kho nào. Vui lòng thêm dữ liệu để
              bắt đầu quản lý.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2">
              <Package className="w-4 h-4" />
              Thêm tồn kho mới
            </button>
          </div>}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
