"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  Car,
  ClipboardList,
  DollarSign,
  TrendingUp,
  Battery,
  Users,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

// Sample Data
const kpiCards = [
  {
    label: "Tổng xe tồn kho",
    value: 430,
    icon: Car,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    change: "+12%",
    changeType: "positive"
  },
  {
    label: "Tổng xe đã bán",
    value: 290,
    icon: ClipboardList,
    bgColor: "bg-amber-100",
    iconColor: "text-amber-600",
    change: "+8%",
    changeType: "positive"
  },
  {
    label: "Doanh thu (triệu VNĐ)",
    value: 125000,
    icon: DollarSign,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    change: "+15%",
    changeType: "positive"
  },
  {
    label: "Tốc độ tiêu thụ TB",
    value: "12%",
    icon: TrendingUp,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    change: "+3%",
    changeType: "positive"
  },
  {
    label: "Xe đang sạc",
    value: 45,
    icon: Battery,
    bgColor: "bg-cyan-100",
    iconColor: "text-cyan-600",
    change: "-5%",
    changeType: "negative"
  },
  {
    label: "Khách hàng mới",
    value: 128,
    icon: Users,
    bgColor: "bg-pink-100",
    iconColor: "text-pink-600",
    change: "+22%",
    changeType: "positive"
  }
];

const salesData = [
  { month: "T1", sales: 45, revenue: 18500 },
  { month: "T2", sales: 52, revenue: 21000 },
  { month: "T3", sales: 48, revenue: 19200 },
  { month: "T4", sales: 61, revenue: 24400 },
  { month: "T5", sales: 55, revenue: 22000 },
  { month: "T6", sales: 67, revenue: 26800 }
];

const vehicleTypes = [
  { name: "Sedan", value: 156, color: "#3b82f6" },
  { name: "SUV", value: 134, color: "#10b981" },
  { name: "Hatchback", value: 89, color: "#f59e0b" },
  { name: "Truck", value: 51, color: "#8b5cf6" }
];

const inventoryStatus = [
  { brand: "VinFast", inStock: 125, sold: 89, pending: 12 },
  { brand: "Tesla", inStock: 87, sold: 65, pending: 8 },
  { brand: "BYD", inStock: 98, sold: 71, pending: 15 },
  { brand: "Hyundai", inStock: 76, sold: 42, pending: 9 },
  { brand: "Nissan", inStock: 44, sold: 23, pending: 5 }
];

const recentActivity = [
  {
    id: 1,
    action: "Bán xe VinFast VF8",
    time: "10 phút trước",
    status: "success"
  },
  {
    id: 2,
    action: "Nhập kho 15 xe Tesla Model 3",
    time: "25 phút trước",
    status: "success"
  },
  {
    id: 3,
    action: "Cảnh báo: Tồn kho BYD thấp",
    time: "1 giờ trước",
    status: "warning"
  },
  {
    id: 4,
    action: "Bán xe Hyundai Ioniq 5",
    time: "2 giờ trước",
    status: "success"
  },
  {
    id: 5,
    action: "Khách hàng mới đăng ký",
    time: "3 giờ trước",
    status: "info"
  }
];

export default function EcoDashboard() {
  useAuthGuard(["Administrator"]);
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatNumber = (value: number) => {
    if (!isClient) return value;
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Eco Dashboard
        </h1>
        <p className="text-slate-600">
          Tổng quan hoạt động xe điện và KPI theo thời gian thực
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {["overview", "analytics", "inventory"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab === "overview"
              ? "Tổng quan"
              : tab === "analytics"
              ? "Phân tích"
              : "Kho hàng"}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-5 -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>

              <div className="flex justify-between items-start mb-4">
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <Icon className={`${card.iconColor} w-6 h-6`} />
                </div>
                <span
                  className={`text-sm font-semibold ${
                    card.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {card.change}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-slate-800 mb-1">
                {typeof card.value === "number"
                  ? formatNumber(card.value)
                  : card.value}
              </h3>
              <p className="text-slate-600 text-sm">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Xu hướng bán hàng và doanh thu
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis yAxisId="left" stroke="#64748b" />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Số xe bán"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={3}
                name="Doanh thu (triệu)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Vehicle Types Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Phân loại xe
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={vehicleTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props) => {
                  const { name, percent } = props as {
                    name: string;
                    percent?: number; // percent có thể undefined
                  };

                  // Kiểm tra percent trước khi dùng
                  const pct = percent ?? 0;

                  return `${name} ${(pct * 100).toFixed(0)}%`;
                }}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {vehicleTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Status */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Tình trạng kho theo thương hiệu
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryStatus}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="brand" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Bar dataKey="inStock" fill="#3b82f6" name="Tồn kho" />
              <Bar dataKey="sold" fill="#10b981" name="Đã bán" />
              <Bar dataKey="pending" fill="#f59e0b" name="Chờ xử lý" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Hoạt động gần đây
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0"
              >
                {activity.status === "success" && (
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                )}
                {activity.status === "warning" && (
                  <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                )}
                {activity.status === "info" && (
                  <Users className="w-5 h-5 text-blue-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">
                    {activity.action}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
          <h3 className="text-sm font-medium opacity-90 mb-2">
            Tỷ lệ chuyển đổi
          </h3>
          <p className="text-3xl font-bold">67.4%</p>
          <p className="text-sm opacity-75 mt-2">
            Từ khách hàng tiềm năng thành giao dịch
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
          <h3 className="text-sm font-medium opacity-90 mb-2">
            Thời gian bán trung bình
          </h3>
          <p className="text-3xl font-bold">18 ngày</p>
          <p className="text-sm opacity-75 mt-2">
            Từ lúc nhập kho đến khi xuất bán
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
          <h3 className="text-sm font-medium opacity-90 mb-2">
            Đánh giá khách hàng
          </h3>
          <p className="text-3xl font-bold">4.8/5</p>
          <p className="text-sm opacity-75 mt-2">Dựa trên 1,247 đánh giá</p>
        </div>
      </div>
    </div>
  );
}
