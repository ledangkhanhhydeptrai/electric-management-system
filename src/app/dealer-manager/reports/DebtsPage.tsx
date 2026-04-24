"use client";
import React, { useState } from "react";
import { Row, Col } from "antd";
import DebtCard from "./components/DebtCard";
import {
  AlertTriangle,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Download,
  TrendingDown,
  ChevronDown,
  X
} from "lucide-react";

interface Debt {
  id: string;
  customer: string;
  debt: number;
  lastPayment: string;
}

// Dữ liệu mẫu
const mockDebts: Debt[] = [
  {
    id: "D001",
    customer: "Nguyen Van A",
    debt: 5000000,
    lastPayment: "2025-09-01"
  },
  { id: "D002", customer: "Tran Thi B", debt: 0, lastPayment: "2025-08-25" },
  { id: "D003", customer: "Le Van C", debt: 2000000, lastPayment: "2025-09-05" }
];

const DebtsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "unpaid">(
    "all"
  );

  // Calculate stats
  const totalCustomers = mockDebts.length;
  const totalDebt = mockDebts.reduce((sum, debt) => sum + debt.debt, 0);
  const paidCustomers = mockDebts.filter((d) => d.debt === 0).length;
  const unpaidCustomers = mockDebts.filter((d) => d.debt > 0).length;
  const avgDebt = totalDebt / unpaidCustomers || 0;

  // Filter debts
  const filteredDebts = mockDebts.filter((debt) => {
    const matchesSearch = debt.customer
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "paid" && debt.debt === 0) ||
      (filterStatus === "unpaid" && debt.debt > 0);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 shadow-lg">
                <AlertTriangle size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Báo Cáo Công Nợ
                </h1>
                <p className="text-orange-100 text-sm md:text-base">
                  Quản lý công nợ khách hàng
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="hidden md:flex gap-2">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30 text-white font-semibold transition-all flex items-center gap-2">
                <Download size={18} />
                <span>Xuất báo cáo</span>
              </button>
              <button className="bg-white hover:bg-gray-100 px-4 py-2 rounded-xl text-orange-600 font-bold transition-all shadow-lg flex items-center gap-2">
                <TrendingDown size={18} />
                <span>Thu nợ</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Tổng công nợ
                </p>
                <p className="text-3xl font-bold text-red-600">
                  {(totalDebt / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-gray-500 mt-1">Cần thu hồi</p>
              </div>
              <div className="bg-red-500 p-3 rounded-xl">
                <DollarSign className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Chưa thanh toán
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  {unpaidCustomers}
                </p>
                <p className="text-xs text-gray-500 mt-1">Khách hàng</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-xl">
                <AlertTriangle className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Đã thanh toán
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {paidCustomers}
                </p>
                <p className="text-xs text-gray-500 mt-1">Khách hàng</p>
              </div>
              <div className="bg-green-500 p-3 rounded-xl">
                <CheckCircle2 className="text-white fill-current" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Công nợ TB
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {(avgDebt / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-gray-500 mt-1">Mỗi khách hàng</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-xl">
                <Users className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Debt Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Status Breakdown */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 p-2 rounded-lg">
                <TrendingDown size={20} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Phân loại công nợ
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Công nợ cao (&gt;5M)
                  </span>
                  <span className="text-sm font-bold text-red-600">
                    {mockDebts.filter((d) => d.debt > 5000000).length} KH
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (mockDebts.filter((d) => d.debt > 5000000).length /
                          totalCustomers) *
                        100
                      }%`
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Công nợ trung bình (1M-5M)
                  </span>
                  <span className="text-sm font-bold text-orange-600">
                    {
                      mockDebts.filter(
                        (d) => d.debt > 1000000 && d.debt <= 5000000
                      ).length
                    }{" "}
                    KH
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (mockDebts.filter(
                          (d) => d.debt > 1000000 && d.debt <= 5000000
                        ).length /
                          totalCustomers) *
                        100
                      }%`
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Đã thanh toán</span>
                  <span className="text-sm font-bold text-green-600">
                    {paidCustomers} KH
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(paidCustomers / totalCustomers) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={20} className="text-blue-600" />
                <h3 className="font-bold text-gray-900">Thời gian</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Quá hạn 30 ngày</span>
                  <span className="text-sm font-bold text-red-600">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Quá hạn 15 ngày</span>
                  <span className="text-sm font-bold text-orange-600">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Đúng hạn</span>
                  <span className="text-sm font-bold text-green-600">
                    {paidCustomers}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-orange-500 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={20}
                  className="text-orange-600 flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-sm font-bold text-orange-900 mb-1">
                    💡 Nhắc nhở
                  </p>
                  <p className="text-xs text-orange-800 leading-relaxed">
                    Có {unpaidCustomers} khách hàng chưa thanh toán. Liên hệ để
                    thu hồi công nợ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Danh Sách Công Nợ
                  </h2>
                  <p className="text-orange-100 text-sm">
                    Hiển thị {filteredDebts.length} khách hàng
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-blue-500 rounded-xl pointer-events-none z-10">
                <Search className="text-white" size={20} />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm khách hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-14 pl-[52px] pr-12 rounded-xl border-2 border-gray-200 bg-white hover:border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-sm hover:shadow-md placeholder:text-gray-400 text-[15px] font-medium text-gray-900"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Select */}
            <div className="relative sm:w-[200px]">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-pink-500 rounded-xl pointer-events-none z-10">
                <Filter className="text-white" size={20} />
              </div>
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as "all" | "paid" | "unpaid")
                }
                className="w-full h-14 pl-[52px] pr-10 rounded-xl border-2 border-gray-200 bg-white hover:border-gray-300 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 shadow-sm hover:shadow-md appearance-none cursor-pointer text-[15px] font-medium text-gray-900"
              >
                <option value="all">Tất cả</option>
                <option value="unpaid">Chưa thanh toán</option>
                <option value="paid">Đã thanh toán</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <ChevronDown className="text-gray-400" size={20} />
              </div>
            </div>
          </div>

          {/* Debt Cards Grid */}
          {filteredDebts.length > 0 ? (
            <Row gutter={[24, 24]}>
              {filteredDebts.map((debt) => (
                <Col key={debt.id} xs={24} sm={12} lg={8}>
                  <DebtCard {...debt} />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="bg-white rounded-2xl p-16 text-center shadow-lg">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-gray-100 p-6 rounded-full">
                  <Search className="text-gray-400" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Không tìm thấy khách hàng
                </h3>
                <p className="text-gray-500">
                  Thử điều chỉnh bộ lọc hoặc tìm kiếm
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                  }}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Summary */}
        <div className="text-center text-gray-600">
          <p className="text-sm">
            Tổng cộng{" "}
            <span className="font-bold text-gray-900">{totalCustomers}</span>{" "}
            khách hàng •{" "}
            <span className="font-bold text-red-600">{unpaidCustomers}</span>{" "}
            chưa thanh toán •{" "}
            <span className="font-bold text-green-600">{paidCustomers}</span> đã
            thanh toán
          </p>
        </div>
      </div>
    </div>
  );
};

export default DebtsPage;
