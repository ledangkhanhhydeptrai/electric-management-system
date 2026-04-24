"use client";
import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart
} from "recharts";

interface Props {
  data: { month: string; forecast: number }[];
}

interface CustomTooltipProps {
  active?: boolean;
  label?: string;
  payload?: { value: number; name: string }[];
}

const formatNumber = (n: number) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 rounded-xl shadow-xl border border-gray-200">
        <p className="text-sm font-semibold text-gray-900 mb-1">
          {label}
        </p>
        <p className="text-lg font-bold text-green-600">
          {formatNumber(payload[0].value)}
        </p>
        <p className="text-xs text-gray-500 mt-1">Dự báo doanh số xe điện</p>
      </div>
    );
  }
  return null;
};

export default function ForecastChartEV({ data }: Props) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const totalForecast = data.reduce((sum, item) => sum + item.forecast, 0);
  const avgForecast = Math.round(totalForecast / data.length);
  const maxForecast = Math.max(...data.map(item => item.forecast));
  const trend =
    data.length > 1
      ? (data[data.length - 1].forecast - data[0].forecast) /
        data[0].forecast *
        100
      : 0;

  return (
    <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg border border-gray-200 p-6 w-full col-span-2 hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
            {/* 🔋 Icon xe điện */}
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 10V4a1 1 0 011-1h8a1 1 0 011 1v6M7 10h10m-3 4v6m-4-6v6M5 20h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              EV Sales Forecast
            </h3>
            <p className="text-sm text-gray-500">
              Dự báo doanh số xe điện trong {data.length} tháng
            </p>
          </div>
        </div>

        {/* Trend indicator */}
        <div
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${trend >=
          0
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"}`}
        >
          <svg
            className={`w-4 h-4 ${trend >= 0 ? "" : "rotate-180"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          {Math.abs(trend).toFixed(1)}%
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs text-gray-500 mb-1">Tổng doanh số dự báo</p>
          <p className="text-lg font-bold text-gray-900">
            {mounted ? formatNumber(totalForecast) : totalForecast}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs text-gray-500 mb-1">Trung bình mỗi tháng</p>
          <p className="text-lg font-bold text-gray-900">
            {mounted ? formatNumber(avgForecast) : avgForecast}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs text-gray-500 mb-1">Cao nhất</p>
          <p className="text-lg font-bold text-gray-900">
            {mounted ? formatNumber(maxForecast) : maxForecast}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              style={{ fontSize: "12px", fontWeight: 500 }}
              tickLine={false}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: "12px", fontWeight: 500 }}
              tickLine={false}
              tickFormatter={value => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#10b981", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="forecast"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#colorForecast)"
              dot={{
                fill: "#10b981",
                strokeWidth: 2,
                r: 4,
                stroke: "#fff"
              }}
              activeDot={{
                r: 6,
                fill: "#10b981",
                stroke: "#fff",
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-gray-600 font-medium">
            Doanh số xe điện dự báo
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-b from-emerald-500/30 to-emerald-500/0" />
          <span className="text-xs text-gray-600 font-medium">Vùng dự báo</span>
        </div>
      </div>
    </div>
  );
}
