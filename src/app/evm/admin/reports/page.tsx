"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import {
  TrendingUp,
  MapPin,
  Package,
  AlertCircle,
  Calendar,
  DollarSign,
  Zap,
  Brain,
  Box,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

// Sample Data
const regionalSalesData = [
  {
    region: "HCM",
    sales: 120000,
    target: 150000,
    growth: 15.5,
    customers: 450
  },
  {
    region: "Hanoi",
    sales: 95000,
    target: 120000,
    growth: 12.3,
    customers: 380
  },
  {
    region: "Da Nang",
    sales: 70000,
    target: 100000,
    growth: 8.7,
    customers: 280
  },
  {
    region: "Can Tho",
    sales: 45000,
    target: 60000,
    growth: 10.2,
    customers: 180
  },
  {
    region: "Hai Phong",
    sales: 38000,
    target: 50000,
    growth: 6.5,
    customers: 150
  }
];

const monthlySalesData = [
  { month: "Jan", HCM: 98000, Hanoi: 82000, DaNang: 62000 },
  { month: "Feb", HCM: 105000, Hanoi: 88000, DaNang: 65000 },
  { month: "Mar", HCM: 112000, Hanoi: 91000, DaNang: 68000 },
  { month: "Apr", HCM: 120000, Hanoi: 95000, DaNang: 70000 }
];

const forecastData = [
  {
    month: "May",
    predicted: 135000,
    lower: 125000,
    upper: 145000,
    confidence: 85
  },
  {
    month: "Jun",
    predicted: 142000,
    lower: 130000,
    upper: 155000,
    confidence: 82
  },
  {
    month: "Jul",
    predicted: 148000,
    lower: 135000,
    upper: 162000,
    confidence: 78
  },
  {
    month: "Aug",
    predicted: 156000,
    lower: 140000,
    upper: 172000,
    confidence: 75
  }
];

const inventoryData = [
  {
    id: "inv1",
    model: "VF e34",
    stock: 45,
    reorderLevel: 20,
    status: "healthy",
    value: 405000
  },
  {
    id: "inv2",
    model: "VF 8",
    stock: 12,
    reorderLevel: 15,
    status: "low",
    value: 360000
  },
  {
    id: "inv3",
    model: "VF 9",
    stock: 8,
    reorderLevel: 10,
    status: "critical",
    value: 480000
  },
  {
    id: "inv4",
    model: "VF 5",
    stock: 32,
    reorderLevel: 25,
    status: "healthy",
    value: 288000
  },
  {
    id: "inv5",
    model: "VF 6",
    stock: 18,
    reorderLevel: 15,
    status: "healthy",
    value: 270000
  }
];

const COLORS = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"];

// Components
interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down";
  color: string;
}

function StatsCard({ icon, label, value, change, trend, color }: StatsCardProps) {
  const isPositive = trend === "up";
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 bg-gradient-to-br ${color} rounded-lg`}>
          {icon}
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 text-sm font-semibold ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            {change}%
          </div>
        )}
      </div>
      <h3 className="text-3xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

interface RegionalCardProps {
  region: {
    region: string;
    sales: number;
    target: number;
    growth: number;
    customers: number;
  };
}

function RegionalCard({ region }: RegionalCardProps) {
  const achievement = ((region.sales / region.target) * 100).toFixed(1);
  const isOnTrack = Number(achievement) >= 80;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{region.region}</h3>
            <p className="text-sm text-gray-500">
              {region.customers} customers
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isOnTrack
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {achievement}%
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Sales</span>
          <span className="font-bold text-gray-800">
            ${region.sales.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Target</span>
          <span className="font-medium text-gray-600">
            ${region.target.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Growth</span>
          <span className="font-semibold text-green-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {region.growth}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className={`h-2 rounded-full transition-all ${
              isOnTrack
                ? "bg-gradient-to-r from-green-500 to-emerald-600"
                : "bg-gradient-to-r from-orange-500 to-orange-600"
            }`}
            style={{ width: `${Math.min(Number(achievement), 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function RegionalSalesPage() {
  useAuthGuard(["Administrator"]);
  const [chartType, setChartType] = useState<"bar" | "line" | "area">("bar");
  const totalSales = regionalSalesData.reduce((sum, r) => sum + r.sales, 0);
  const avgGrowth = (
    regionalSalesData.reduce((sum, r) => sum + r.growth, 0) /
    regionalSalesData.length
  ).toFixed(1);
  const totalInventoryValue = inventoryData.reduce(
    (sum, i) => sum + i.value,
    0
  );

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Regional Sales Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Comprehensive overview of sales, forecasts, and inventory across
                all regions
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Last 30 Days
              </button>
            </div>
          </div>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            icon={<DollarSign className="w-6 h-6 text-white" />}
            label="Total Sales"
            value={`$${totalSales.toLocaleString()}`}
            change={12.5}
            trend="up"
            color="from-green-500 to-emerald-600"
          />
          <StatsCard
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            label="Avg Growth Rate"
            value={`${avgGrowth}%`}
            change={3.2}
            trend="up"
            color="from-blue-500 to-blue-600"
          />
          <StatsCard
            icon={<MapPin className="w-6 h-6 text-white" />}
            label="Active Regions"
            value={regionalSalesData.length}
            color="from-purple-500 to-purple-600"
          />
          <StatsCard
            icon={<Package className="w-6 h-6 text-white" />}
            label="Inventory Value"
            value={`$${(totalInventoryValue / 1000).toFixed(0)}K`}
            color="from-orange-500 to-orange-600"
          />
        </div>

        {/* Regional Performance */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              Regional Performance
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setChartType("bar")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  chartType === "bar"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Bar
              </button>
              <button
                onClick={() => setChartType("line")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  chartType === "line"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Line
              </button>
              <button
                onClick={() => setChartType("area")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  chartType === "area"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Area
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={350}>
                {chartType === "bar" ? (
                  <BarChart data={regionalSalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
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
                ) : chartType === "line" ? (
                  <LineChart data={monthlySalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="HCM"
                      stroke="#3B82F6"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="Hanoi"
                      stroke="#8B5CF6"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="DaNang"
                      stroke="#EC4899"
                      strokeWidth={3}
                    />
                  </LineChart>
                ) : (
                  <AreaChart data={monthlySalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="HCM"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="Hanoi"
                      stackId="1"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="DaNang"
                      stackId="1"
                      stroke="#EC4899"
                      fill="#EC4899"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>

            <div>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={regionalSalesData}
                    dataKey="sales"
                    nameKey="region"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={({ region, percent }) =>
                      `${region} ${((percent as number) * 100).toFixed(0)}%`
                    }
                  >
                    {regionalSalesData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {regionalSalesData.slice(0, 3).map((region) => (
              <RegionalCard key={region.region} region={region} />
            ))}
          </div>
        </section>

        {/* AI Forecast */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              AI Sales Forecast
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="upper"
                    stackId="1"
                    stroke="#E5E7EB"
                    fill="#E5E7EB"
                    fillOpacity={0.3}
                    name="Upper Bound"
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stackId="2"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.6}
                    strokeWidth={3}
                    name="Prediction"
                  />
                  <Area
                    type="monotone"
                    dataKey="lower"
                    stackId="3"
                    stroke="#E5E7EB"
                    fill="#E5E7EB"
                    fillOpacity={0.3}
                    name="Lower Bound"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {forecastData.map((forecast, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {forecast.month}
                      </h4>
                      <p className="text-2xl font-bold text-purple-600">
                        ${(forecast.predicted / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-purple-200 text-purple-700 text-xs font-semibold rounded-full">
                      {forecast.confidence}% confident
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Range: ${(forecast.lower / 1000).toFixed(0)}K - $
                    {(forecast.upper / 1000).toFixed(0)}K
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
            <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">AI Insights</h4>
              <p className="text-sm text-blue-800">
                Sales are projected to grow by 22% over the next 4 months. HCM
                region shows strongest growth potential. Consider increasing
                inventory for VF e34 and VF 8 models to meet anticipated demand.
              </p>
            </div>
          </div>
        </section>

        {/* Inventory Report */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Inventory Report
            </h2>
          </div>

          <div className="grid gap-4">
            {inventoryData.map((item) => (
              <div
                key={item.id}
                className={`border-2 rounded-xl p-5 transition-all hover:shadow-md ${
                  item.status === "critical"
                    ? "border-red-200 bg-red-50"
                    : item.status === "low"
                    ? "border-orange-200 bg-orange-50"
                    : "border-gray-100 bg-white"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                        <Box className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {item.model}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Inventory Value: ${item.value.toLocaleString()}
                        </p>
                      </div>
                      {item.status === "critical" && (
                        <AlertCircle className="w-5 h-5 text-red-600 ml-2" />
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Current Stock
                        </p>
                        <p
                          className={`text-2xl font-bold ${
                            item.status === "critical"
                              ? "text-red-600"
                              : item.status === "low"
                              ? "text-orange-600"
                              : "text-green-600"
                          }`}
                        >
                          {item.stock}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Reorder Level
                        </p>
                        <p className="text-2xl font-bold text-gray-700">
                          {item.reorderLevel}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === "critical"
                              ? "bg-red-200 text-red-700"
                              : item.status === "low"
                              ? "bg-orange-200 text-orange-700"
                              : "bg-green-200 text-green-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Stock Level</span>
                        <span>
                          {((item.stock / item.reorderLevel) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            item.status === "critical"
                              ? "bg-gradient-to-r from-red-500 to-red-600"
                              : item.status === "low"
                              ? "bg-gradient-to-r from-orange-500 to-orange-600"
                              : "bg-gradient-to-r from-green-500 to-emerald-600"
                          }`}
                          style={{
                            width: `${Math.min(
                              (item.stock / item.reorderLevel) * 100,
                              100
                            )}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="ml-4">
                    {(item.status === "low" || item.status === "critical") && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap">
                        Reorder Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-900">
                  Healthy Stock
                </span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {inventoryData.filter((i) => i.status === "healthy").length}
              </p>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-orange-900">Low Stock</span>
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {inventoryData.filter((i) => i.status === "low").length}
              </p>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-900">Critical</span>
              </div>
              <p className="text-2xl font-bold text-red-600">
                {inventoryData.filter((i) => i.status === "critical").length}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
