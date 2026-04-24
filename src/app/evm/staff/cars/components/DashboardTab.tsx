import React from "react";
import {
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
  ResponsiveContainer
} from "recharts";
import {
  Package,
  TrendingUp,
  DollarSign,
  Battery,
  AlertCircle
} from "lucide-react";
import StatCard from "./StatCard";
import { ModelDistribution, SalesData } from "../types";

interface DashboardTabProps {
  totalStock: number;
  totalSold: number;
  // totalRevenue: number;
  // avgPrice: number;
  salesData: SalesData[];
  modelDistribution: ModelDistribution[];
}

export default function DashboardTab({
  totalStock,
  totalSold,
  // totalRevenue,
  // avgPrice,
  salesData,
  modelDistribution
}: DashboardTabProps) {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Package}
          title="Tổng tồn kho"
          value={totalStock}
          subtitle="xe trong kho"
          color="bg-blue-500"
        />
        <StatCard
          icon={TrendingUp}
          title="Đã bán"
          value={totalSold}
          subtitle="xe trong năm"
          color="bg-green-500"
        />
        {/* <StatCard
          icon={DollarSign}
          title="Doanh thu"
          value={`$${(totalRevenue / 1000000).toFixed(1)}M`}
          subtitle="tổng doanh thu"
          color="bg-purple-500"
        />
        <StatCard
          icon={Battery}
          title="Giá trung bình"
          value={`$${(avgPrice / 1000).toFixed(0)}K`}
          subtitle="mỗi xe"
          color="bg-orange-500"
        /> */}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Doanh số theo tháng
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Số xe bán"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Model Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Phân bổ theo model
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={modelDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${((percent as number) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {modelDistribution.map((entry, index) =>
                  <Cell key={`cell-${index}`} fill={entry.color} />
                )}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-red-900">Cảnh báo tồn kho thấp</h4>
          <p className="text-sm text-red-700 mt-1">
            Có 2 model xe sắp hết hàng: VF9 (5 xe) và VF5 (2 xe). Cần nhập hàng
            sớm.
          </p>
        </div>
      </div>
    </div>
  );
}
