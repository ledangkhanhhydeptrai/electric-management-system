import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";
import { TrendingUp } from "lucide-react";

interface ForecastChartProps {
  data: { month: string; value: number }[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg col-span-3">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full">
          <TrendingUp size={18} />
        </div>
        <h3 className="text-lg font-semibold text-gray-700">
          📈 Dự báo nhu cầu
        </h3>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <defs>
            {/* Gradient cho line */}
            <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#a855f7" stopOpacity={0.4} />
            </linearGradient>

            {/* Gradient cho area */}
            <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />

          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
            }}
            labelStyle={{ color: "#374151", fontWeight: "600" }}
          />

          {/* Area fill */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="none"
            fill="url(#fillColor)"
          />

          {/* Line chart */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#lineColor)"
            strokeWidth={3}
            dot={{ r: 4, fill: "#6366f1" }}
            activeDot={{ r: 6, fill: "#a855f7" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
