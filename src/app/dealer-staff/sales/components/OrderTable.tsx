"use client";

import React, { useMemo, useState, ChangeEvent } from "react";
import {
  Search,
  Download,
  Car,
  User,
  Eye,
  Trash2,
  Edit,
  Filter,
  X,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";

/** Types */
type OrderStatus = "Completed" | "Pending" | "Cancelled";

interface Order {
  id: string;
  customer: string;
  car: string;
  status: OrderStatus;
  amount: number;
  createdAt: string;
}

/** Sample data */
const rawData: Order[] = [
  {
    id: "O001",
    customer: "Nguyễn Văn A",
    car: "VF8",
    status: "Pending",
    amount: 35000,
    createdAt: "2025-09-01T10:15:00Z"
  },
  {
    id: "O002",
    customer: "Trần Thị B",
    car: "VF9",
    status: "Completed",
    amount: 55000,
    createdAt: "2025-09-03T14:20:00Z"
  },
  {
    id: "O003",
    customer: "Lê Văn C",
    car: "e34",
    status: "Cancelled",
    amount: 20000,
    createdAt: "2025-09-05T08:45:00Z"
  },
  {
    id: "O004",
    customer: "Phạm Thị D",
    car: "VF8",
    status: "Completed",
    amount: 35000,
    createdAt: "2025-09-07T16:30:00Z"
  },
  {
    id: "O005",
    customer: "Hoàng Văn E",
    car: "VF9",
    status: "Pending",
    amount: 55000,
    createdAt: "2025-09-10T09:00:00Z"
  }
];

/** Component */
const OrderTable: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<"All" | OrderStatus>("All");

  const data = useMemo<Order[]>(() => {
    const s = search.trim().toLowerCase();
    return rawData.filter((o) => {
      const matchText =
        o.id.toLowerCase().includes(s) ||
        o.customer.toLowerCase().includes(s) ||
        o.car.toLowerCase().includes(s);
      const matchStatus = status === "All" ? true : o.status === status;
      return matchText && matchStatus;
    });
  }, [search, status]);

  const stats = useMemo(() => {
    return {
      total: rawData.length,
      completed: rawData.filter((o) => o.status === "Completed").length,
      pending: rawData.filter((o) => o.status === "Pending").length,
      cancelled: rawData.filter((o) => o.status === "Cancelled").length,
      revenue: rawData
        .filter((o) => o.status === "Completed")
        .reduce((sum, o) => sum + o.amount, 0)
    };
  }, []);

  const exportCSV = (): void => {
    const header = ["id,customer,car,status,amount,createdAt"];
    const rows = data.map((d) =>
      [d.id, d.customer, d.car, d.status, String(d.amount), d.createdAt].join(
        ","
      )
    );
    const csv = [...header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setSearch(e.target.value);

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>): void =>
    setStatus(e.target.value as "All" | OrderStatus);

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
  };

  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case "Completed":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          border: "border-green-300",
          icon: <CheckCircle className="w-3.5 h-3.5" />
        };
      case "Pending":
        return {
          bg: "bg-orange-100",
          text: "text-orange-700",
          border: "border-orange-300",
          icon: <Clock className="w-3.5 h-3.5" />
        };
      case "Cancelled":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          border: "border-red-300",
          icon: <XCircle className="w-3.5 h-3.5" />
        };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="text-blue-600 text-sm font-medium mb-1">Tổng đơn</div>
          <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="text-green-600 text-sm font-medium mb-1">
            Hoàn thành
          </div>
          <div className="text-2xl font-bold text-green-900">
            {stats.completed}
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <div className="text-orange-600 text-sm font-medium mb-1">
            Đang xử lý
          </div>
          <div className="text-2xl font-bold text-orange-900">
            {stats.pending}
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
          <div className="text-red-600 text-sm font-medium mb-1">Đã hủy</div>
          <div className="text-2xl font-bold text-red-900">
            {stats.cancelled}
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className="text-purple-600 text-sm font-medium mb-1">
            Doanh thu
          </div>
          <div className="text-lg font-bold text-purple-900">
            {formatCurrency(stats.revenue)}
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 w-full lg:max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm theo mã đơn, khách hàng, xe..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all"
                aria-label="Tìm kiếm đơn hàng"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              <select
                value={status}
                onChange={handleStatusChange}
                className="pl-10 pr-8 py-3 rounded-xl border-2 border-gray-300 bg-gray-50 text-gray-900 focus:ring-4 focus:ring-green-100 focus:border-green-500 font-medium appearance-none cursor-pointer transition-all"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "1.5em 1.5em"
                }}
                aria-label="Lọc trạng thái"
              >
                <option value="All">Tất cả trạng thái</option>
                <option value="Completed">✅ Hoàn tất</option>
                <option value="Pending">⏳ Đang xử lý</option>
                <option value="Cancelled">❌ Đã hủy</option>
              </select>
            </div>

            {/* Clear Filters */}
            {(search || status !== "All") && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 font-medium transition-all"
                type="button"
              >
                <X className="h-4 w-4" />
                Xóa bộ lọc
              </button>
            )}

            {/* Export Button */}
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              type="button"
              aria-label="Xuất CSV"
            >
              <Download className="h-4 w-4" />
              Xuất Excel
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {(search || status !== "All") && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">Đang lọc:</span>
              {search && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium">
                  {search}
                </span>
              )}
              {status !== "All" && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-medium">
                  {status}
                </span>
              )}
              <span className="text-gray-500">• {data.length} kết quả</span>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      {data.length > 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Mã đơn
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Xe
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Giá trị
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((order, index) => {
                  const statusConfig = getStatusConfig(order.status);
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors group"
                      style={{
                        animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
                      }}
                    >
                      {/* Mã đơn */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-sm font-bold text-gray-900">
                            {order.id}
                          </span>
                        </div>
                      </td>

                      {/* Khách hàng */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-md">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {order.customer}
                            </div>
                            <div className="text-xs text-gray-500">
                              Khách hàng cá nhân
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Xe */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200 w-fit">
                          <Car className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-semibold text-blue-900">
                            VinFast {order.car}
                          </span>
                        </div>
                      </td>

                      {/* Trạng thái */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                        >
                          {statusConfig.icon}
                          {order.status}
                        </span>
                      </td>

                      {/* Giá trị */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-bold text-gray-900">
                          {formatCurrency(order.amount)}
                        </div>
                      </td>

                      {/* Ngày tạo */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            title="Xem chi tiết"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="h-4 w-4" />
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
      ) : (
        // Empty State
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
          <div className="max-w-sm mx-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Không tìm thấy đơn hàng
            </h3>
            <p className="text-gray-600 mb-6">
              Không có đơn hàng nào khớp với bộ lọc của bạn. Thử điều chỉnh tìm
              kiếm hoặc bộ lọc.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideIn {
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

export default OrderTable;
