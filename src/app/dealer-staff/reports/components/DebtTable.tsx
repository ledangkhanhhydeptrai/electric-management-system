import React, { useState, useMemo } from "react";
import {
  UserOutlined,
  DollarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  EditOutlined,
  BellOutlined,
  WarningOutlined
} from "@ant-design/icons";

interface Debt {
  id: string;
  customer: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Unpaid";
}

interface Props {
  debts: Debt[];
}

const DebtTable: React.FC<Props> = ({ debts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Paid" | "Unpaid">(
    "All"
  );
  const [sortBy, setSortBy] = useState<"amount" | "date">("date");

  // Filter and sort debts
  const filteredDebts = useMemo(() => {
    const filtered = debts.filter((debt) => {
      const matchSearch =
        debt.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        debt.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus =
        statusFilter === "All" || debt.status === statusFilter;
      return matchSearch && matchStatus;
    });

    // Sort
    return filtered.sort((a, b) => {
      if (sortBy === "amount") {
        return b.amount - a.amount;
      } else {
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
    });
  }, [debts, searchTerm, statusFilter, sortBy]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = debts.reduce((sum, d) => sum + d.amount, 0);
    const paid = debts
      .filter((d) => d.status === "Paid")
      .reduce((sum, d) => sum + d.amount, 0);
    const unpaid = debts
      .filter((d) => d.status === "Unpaid")
      .reduce((sum, d) => sum + d.amount, 0);
    const overdue = debts.filter(
      (d) => d.status === "Unpaid" && new Date(d.dueDate) < new Date()
    ).length;

    return {
      total,
      paid,
      unpaid,
      overdue,
      paidCount: debts.filter((d) => d.status === "Paid").length
    };
  }, [debts]);

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

  const isOverdue = (dateString: string, status: string) => {
    return status === "Unpaid" && new Date(dateString) < new Date();
  };

  const getDaysUntilDue = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <DollarOutlined className="text-blue-600 text-2xl" />
            <div className="text-xs text-blue-700 font-medium">Tổng</div>
          </div>
          <div className="text-2xl font-black text-blue-900">
            {formatCurrency(stats.total)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border-2 border-green-200">
          <div className="flex items-center justify-between mb-2">
            <CheckCircleOutlined className="text-green-600 text-2xl" />
            <div className="text-xs text-green-700 font-medium">Đã thu</div>
          </div>
          <div className="text-2xl font-black text-green-900">
            {formatCurrency(stats.paid)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border-2 border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <CloseCircleOutlined className="text-orange-600 text-2xl" />
            <div className="text-xs text-orange-700 font-medium">Còn nợ</div>
          </div>
          <div className="text-2xl font-black text-orange-900">
            {formatCurrency(stats.unpaid)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border-2 border-red-200">
          <div className="flex items-center justify-between mb-2">
            <WarningOutlined className="text-red-600 text-2xl" />
            <div className="text-xs text-red-700 font-medium">Quá hạn</div>
          </div>
          <div className="text-2xl font-black text-red-900">
            {stats.overdue}
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="flex-1 w-full lg:max-w-md">
            <div className="relative">
              <SearchOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Tìm kiếm theo khách hàng, mã..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl border-2 border-gray-300 p-1">
              <button
                onClick={() => setStatusFilter("All")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  statusFilter === "All"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setStatusFilter("Paid")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  statusFilter === "Paid"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                ✓ Đã thu
              </button>
              <button
                onClick={() => setStatusFilter("Unpaid")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  statusFilter === "Unpaid"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                ✕ Chưa thu
              </button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "amount" | "date")}
              className="px-4 py-3 rounded-xl border-2 border-gray-300 bg-gray-50 text-gray-900 font-semibold focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="date">📅 Ngày đến hạn</option>
              <option value="amount">💰 Số tiền</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || statusFilter !== "All") && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm">
              <FilterOutlined className="text-gray-500" />
              <span className="text-gray-600 font-medium">Đang lọc:</span>
              {searchTerm && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium">
                  {searchTerm}
                </span>
              )}
              {statusFilter !== "All" && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg font-medium">
                  {statusFilter}
                </span>
              )}
              <span className="text-gray-500">
                • {filteredDebts.length} kết quả
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      {filteredDebts.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <UserOutlined />
                      Khách hàng
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center justify-end gap-2">
                      <DollarOutlined />
                      Số tiền
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <CalendarOutlined />
                      Ngày đến hạn
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDebts.map((debt, index) => {
                  const overdue = isOverdue(debt.dueDate, debt.status);
                  const daysUntil = getDaysUntilDue(debt.dueDate);

                  return (
                    <tr
                      key={debt.id}
                      className="hover:bg-gray-50 transition-colors"
                      style={{
                        animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
                      }}
                    >
                      {/* Customer */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                            {debt.customer
                              .split(" ")
                              .map((w) => w[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {debt.customer}
                            </div>
                            <div className="text-xs text-gray-500">
                              {debt.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {formatCurrency(debt.amount)}
                        </div>
                      </td>

                      {/* Due Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="inline-flex flex-col items-center">
                          <div
                            className={`text-sm font-semibold ${
                              overdue ? "text-red-600" : "text-gray-900"
                            }`}
                          >
                            {formatDate(debt.dueDate)}
                          </div>
                          {debt.status === "Unpaid" && (
                            <div
                              className={`text-xs font-medium mt-1 ${
                                overdue
                                  ? "text-red-600"
                                  : daysUntil <= 7
                                  ? "text-orange-600"
                                  : "text-gray-600"
                              }`}
                            >
                              {overdue
                                ? `⚠️ Quá hạn ${Math.abs(daysUntil)} ngày`
                                : daysUntil === 0
                                ? "📌 Đến hạn hôm nay"
                                : `📅 Còn ${daysUntil} ngày`}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="inline-flex">
                          {debt.status === "Paid" ? (
                            <div className="flex items-center gap-1.5 px-4 py-2 bg-green-100 text-green-700 border-2 border-green-300 rounded-xl font-bold text-sm">
                              <CheckCircleOutlined />
                              Đã thu
                            </div>
                          ) : overdue ? (
                            <div className="flex items-center gap-1.5 px-4 py-2 bg-red-100 text-red-700 border-2 border-red-300 rounded-xl font-bold text-sm animate-pulse">
                              <WarningOutlined />
                              Quá hạn
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 px-4 py-2 bg-orange-100 text-orange-700 border-2 border-orange-300 rounded-xl font-bold text-sm">
                              <CloseCircleOutlined />
                              Chưa thu
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg border border-blue-200 transition-all"
                            title="Xem chi tiết"
                          >
                            <EyeOutlined />
                          </button>
                          <button
                            className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg border border-green-200 transition-all"
                            title="Chỉnh sửa"
                          >
                            <EditOutlined />
                          </button>
                          {debt.status === "Unpaid" && (
                            <button
                              className="p-2 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg border border-orange-200 transition-all"
                              title="Nhắc nhở"
                            >
                              <BellOutlined />
                            </button>
                          )}
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
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <DollarOutlined className="text-gray-400 text-5xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Không tìm thấy kết quả
            </h3>
            <p className="text-gray-600 mb-6">
              Không có khoản nợ nào khớp với bộ lọc của bạn.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DebtTable;
