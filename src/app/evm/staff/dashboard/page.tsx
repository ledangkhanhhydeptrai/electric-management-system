"use client"
import {
  ShoppingCart,
  DollarSign,
  Package,
  Users,
  Activity,
  BarChart3,
  Calendar,
  Bell,
  Settings,
  Eye,
  Target,
  TrendingUp
} from "lucide-react";
import React from "react";
import StatsCard from "./components/StatsCard";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { forecastData, recentActivities, salesByCategory } from "./types/data";
import ActivityItem from "./components/ActivityItem";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

export default function DashboardPage() {
  useAuthGuard(["EVM Staff"]);
  const [chartType, setChartType] = React.useState<"line" | "area" | "bar">(
    "area"
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background decorations */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-200/20 to-pink-200/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200/50">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Dashboard Overview
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Tổng quan doanh số và hiệu suất kinh doanh
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all">
                <Calendar className="w-5 h-5 text-emerald-700" />
                <span className="text-sm text-emerald-800 font-semibold">
                  Last 30 Days
                </span>
              </button>

              <button className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all">
                <Bell className="w-5 h-5 text-blue-700" />
              </button>

              <button className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl hover:border-purple-300 hover:shadow-lg transition-all">
                <Settings className="w-5 h-5 text-purple-700" />
              </button>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            icon={<DollarSign className="w-8 h-8 text-white" />}
            label="Total Revenue"
            value="$2.5M"
            change={12.5}
            trend="up"
            gradient="from-emerald-500 to-teal-600"
          />
          <StatsCard
            icon={<ShoppingCart className="w-8 h-8 text-white" />}
            label="Total Sales"
            value="1,234"
            change={8.3}
            trend="up"
            gradient="from-blue-500 to-indigo-600"
          />
          <StatsCard
            icon={<Package className="w-8 h-8 text-white" />}
            label="Inventory"
            value="500"
            change={3.2}
            trend="down"
            gradient="from-orange-500 to-amber-600"
          />
          <StatsCard
            icon={<Users className="w-8 h-8 text-white" />}
            label="Active Dealers"
            value="48"
            change={5.7}
            trend="up"
            gradient="from-purple-500 to-pink-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Sales Performance
                  </h2>
                  <p className="text-sm text-gray-600">
                    Theo dõi doanh số và mục tiêu
                  </p>
                </div>
              </div>

              <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                {(["line", "area", "bar"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setChartType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      chartType === type
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={350}>
              {chartType === "area" ? (
                <AreaChart data={forecastData}>
                  <defs>
                    <linearGradient
                      id="salesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#3B82F6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="profitGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10B981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#3B82F6"
                    fill="url(#salesGradient)"
                    strokeWidth={3}
                    name="Sales"
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="#10B981"
                    fill="url(#profitGradient)"
                    strokeWidth={3}
                    name="Profit"
                  />
                </AreaChart>
              ) : chartType === "line" ? (
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3B82F6"
                    strokeWidth={4}
                    name="Sales"
                    dot={{ fill: "#3B82F6", r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#E5E7EB"
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    name="Target"
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#10B981"
                    strokeWidth={4}
                    name="Profit"
                    dot={{ fill: "#10B981", r: 6 }}
                  />
                </LineChart>
              ) : (
                <BarChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="sales"
                    fill="#3B82F6"
                    name="Sales"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="target"
                    fill="#E5E7EB"
                    name="Target"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-700 font-semibold mb-1">
                  Avg Sales
                </p>
                <p className="text-3xl font-bold text-blue-900">$410K</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <p className="text-sm text-green-700 font-semibold mb-1">
                  Avg Profit
                </p>
                <p className="text-3xl font-bold text-green-900">$110K</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <p className="text-sm text-purple-700 font-semibold mb-1">
                  Growth
                </p>
                <p className="text-3xl font-bold text-purple-900">+12.5%</p>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Sales by Category
            </h2>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={salesByCategory}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent }: { name?: string; percent?: number }) =>
                    `${name ?? ""} ${(Number(percent ?? 0) * 100).toFixed(0)}%`
                  }
                  labelLine={{ stroke: "#94a3b8", strokeWidth: 2 }}
                >
                  {salesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-3 mt-6">
              {salesByCategory.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full shadow-md"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {cat.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activities Section */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Recent Activities
                </h2>
                <p className="text-sm text-gray-600">
                  Latest transactions and updates
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl font-semibold transition-all">
              <Eye className="w-4 h-4" />
              View All
            </button>
          </div>

          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl p-8 text-white overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -ml-24 -mb-24" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-bold">Performance Summary</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: "Revenue Target", value: "85%", width: 85 },
                { label: "Sales Target", value: "92%", width: 92 },
                { label: "Customer Satisfaction", value: "4.8/5", stars: true },
                { label: "Inventory Turnover", value: "6.2x", sub: "Per month" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                >
                  <p className="text-white/80 text-sm mb-2 font-medium">
                    {item.label}
                  </p>
                  <p className="text-4xl font-bold mb-3">{item.value}</p>
                  {item.width !== undefined && (
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div
                        className="bg-white rounded-full h-3 transition-all duration-1000"
                        style={{ width: `${item.width}%` }}
                      />
                    </div>
                  )}
                  {item.stars && (
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-300 text-xl">
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                  {item.sub && (
                    <p className="text-white/70 text-sm mt-2">{item.sub}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
