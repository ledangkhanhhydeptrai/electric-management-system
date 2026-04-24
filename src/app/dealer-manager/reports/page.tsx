"use client";
import React, { useState } from "react";
import { Row, Col } from "antd";
import StaffSalesCard from "./components/StaffSalesCard";
import SalesChart from "./components/SalesChart";
import DebtCard from "./components/DebtCard";
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Award,
  AlertTriangle,
  Search,
  Download,
  Activity
} from "lucide-react";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

interface StaffSales {
  id: string;
  staffName: string;
  orders: number;
  totalRevenue: number;
}

interface Debt {
  id: string;
  customer: string;
  debt: number;
  lastPayment: string;
}

// Dữ liệu mẫu cho nhân viên
const mockStaffSales: StaffSales[] = [
  { id: "S001", staffName: "Nguyen Van A", orders: 12, totalRevenue: 12000000 },
  { id: "S002", staffName: "Tran Thi B", orders: 8, totalRevenue: 9000000 },
  { id: "S003", staffName: "Le Van C", orders: 15, totalRevenue: 15000000 }
];

// Dữ liệu mẫu cho công nợ
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

const StaffSalesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  useAuthGuard(["Dealer Manager"]);
  // Calculate stats
  const totalRevenue = mockStaffSales.reduce(
    (sum, staff) => sum + staff.totalRevenue,
    0
  );
  const totalOrders = mockStaffSales.reduce(
    (sum, staff) => sum + staff.orders,
    0
  );
  const totalStaff = mockStaffSales.length;
  const avgRevenuePerStaff = totalRevenue / totalStaff;

  const totalDebt = mockDebts.reduce((sum, debt) => sum + debt.debt, 0);
  const paidCustomers = mockDebts.filter((d) => d.debt === 0).length;
  const debtCustomers = mockDebts.filter((d) => d.debt > 0).length;

  // Top performer
  const topPerformer = mockStaffSales.reduce((prev, current) =>
    current.totalRevenue > prev.totalRevenue ? current : prev
  );

  const filteredStaff = mockStaffSales.filter((staff) =>
    staff.staffName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="">
      {/* Sticky Header */}
      <div className="top-0 z-40 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 shadow-lg">
                <TrendingUp size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Báo Cáo Doanh Số
                </h1>
                <p className="text-green-100 text-sm md:text-base">
                  Theo dõi hiệu suất nhân viên và công nợ
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="hidden md:flex gap-2">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30 text-white font-semibold transition-all flex items-center gap-2">
                <Download size={18} />
                <span>Xuất báo cáo</span>
              </button>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30 text-white font-semibold transition-all appearance-none cursor-pointer"
              >
                <option value="day" className="text-gray-900">
                  Hôm nay
                </option>
                <option value="week" className="text-gray-900">
                  Tuần này
                </option>
                <option value="month" className="text-gray-900">
                  Tháng này
                </option>
                <option value="year" className="text-gray-900">
                  Năm nay
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Tổng doanh thu
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {(totalRevenue / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ↑ 15% vs tháng trước
                </p>
              </div>
              <div className="bg-blue-500 p-3 rounded-xl">
                <DollarSign className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Tổng đơn hàng
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {totalOrders}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {totalStaff} nhân viên
                </p>
              </div>
              <div className="bg-green-500 p-3 rounded-xl">
                <ShoppingCart className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  TB/Nhân viên
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {(avgRevenuePerStaff / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {(totalOrders / totalStaff).toFixed(1)} đơn
                </p>
              </div>
              <div className="bg-purple-500 p-3 rounded-xl">
                <Users className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Công nợ
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {(totalDebt / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {debtCustomers} khách hàng
                </p>
              </div>
              <div className="bg-orange-500 p-3 rounded-xl">
                <AlertTriangle className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Performer & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Top Performer */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Award size={20} className="text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Nhân viên xuất sắc
                </h3>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {topPerformer.staffName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {topPerformer.staffName}
                    </p>
                    <p className="text-sm text-gray-600">
                      ID: {topPerformer.id}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-yellow-600">
                    {(topPerformer.totalRevenue / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-sm text-gray-600">
                    {topPerformer.orders} đơn hàng
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={20} className="text-green-600" />
              <h3 className="font-bold text-gray-900">Hiệu suất</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Hoàn thành</span>
                  <span className="text-sm font-bold text-green-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-[85%]"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Đúng hạn</span>
                  <span className="text-sm font-bold text-blue-600">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full w-[92%]"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Hài lòng</span>
                  <span className="text-sm font-bold text-purple-600">96%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[96%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Sales Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Doanh Số Nhân Viên
                  </h2>
                  <p className="text-blue-100 text-sm">
                    Hiển thị {filteredStaff.length} nhân viên
                  </p>
                </div>
              </div>

              {/* Search */}
              <div className="hidden md:block w-64">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Tìm nhân viên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <Row gutter={[24, 24]}>
            {filteredStaff.map((staff) => (
              <Col key={staff.id} xs={24} sm={12} lg={8}>
                <StaffSalesCard {...staff} />
              </Col>
            ))}
          </Row>
        </div>

        {/* Sales Chart */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                <TrendingUp size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Biểu Đồ Doanh Số
                </h2>
                <p className="text-purple-100 text-sm">
                  So sánh hiệu suất nhân viên
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <SalesChart data={mockStaffSales} />
          </div>
        </div>

        {/* Debt Section */}
        <div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <AlertTriangle size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Công Nợ Khách Hàng
                  </h2>
                  <p className="text-orange-100 text-sm">
                    {debtCustomers} khách hàng có công nợ
                  </p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-white/80">Tổng công nợ</p>
                  <p className="text-2xl font-bold text-white">
                    {(totalDebt / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/80">Đã thanh toán</p>
                  <p className="text-2xl font-bold text-white">
                    {paidCustomers}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Row gutter={[24, 24]}>
            {mockDebts.map((debt) => (
              <Col key={debt.id} xs={24} sm={12} lg={8}>
                <DebtCard {...debt} />
              </Col>
            ))}
          </Row>
        </div>

        {/* Bottom Summary */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            Tổng cộng{" "}
            <span className="font-bold text-gray-900">{totalStaff}</span> nhân
            viên •{" "}
            <span className="font-bold text-blue-600">{totalOrders}</span> đơn
            hàng •{" "}
            <span className="font-bold text-green-600">
              {(totalRevenue / 1000000).toFixed(1)}M
            </span>{" "}
            doanh thu
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffSalesPage;
