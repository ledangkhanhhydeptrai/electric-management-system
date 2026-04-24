"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";
import { ChartData } from "chart.js";
import { TrendingUp, BarChart3, DollarSign, ShoppingCart } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Bar),
  { ssr: false }
);

interface Props {
  data: { 
    staffName: string; 
    totalRevenue: number;
    orders?: number;
  }[];
}

const SalesChart: React.FC<Props> = ({ data }) => {
  const [chartData, setChartData] = useState<
    ChartData<"bar", number[], string>
  >({
    labels: [],
    datasets: []
  });

  const [selectedMetric, setSelectedMetric] = useState<"revenue" | "orders">("revenue");

  useEffect(() => {
    const hasOrders = data.some(d => d.orders !== undefined);

    if (selectedMetric === "revenue" || !hasOrders) {
      setChartData({
        labels: data.map((d) => d.staffName),
        datasets: [
          {
            label: "Doanh thu (VNĐ)",
            data: data.map((d) => d.totalRevenue),
            backgroundColor: "rgba(59, 130, 246, 0.8)", // Blue
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 2,
            borderRadius: 8,
            barThickness: 60,
            hoverBackgroundColor: "rgba(37, 99, 235, 0.9)"
          }
        ]
      });
    } else {
      setChartData({
        labels: data.map((d) => d.staffName),
        datasets: [
          {
            label: "Số đơn hàng",
            data: data.map((d) => d.orders || 0),
            backgroundColor: "rgba(16, 185, 129, 0.8)", // Green
            borderColor: "rgba(16, 185, 129, 1)",
            borderWidth: 2,
            borderRadius: 8,
            barThickness: 60,
            hoverBackgroundColor: "rgba(5, 150, 105, 0.9)"
          }
        ]
      });
    }
  }, [data, selectedMetric]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (selectedMetric === "revenue") {
              label += (context.parsed.y / 1000000).toFixed(1) + 'M VNĐ';
            } else {
              label += context.parsed.y + ' đơn';
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(156, 163, 175, 0.1)"
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
            weight: 500
          },
          callback: function(value) {
            if (selectedMetric === "revenue") {
              return (Number(value) / 1000000).toFixed(0) + 'M';
            }
            return value;
          }
        },
        border: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
            weight: 600
          }
        },
        border: {
          display: false
        }
      }
    },
    animation: {
      duration: 800,
      easing: 'easeInOutQuart'
    }
  };

  // Calculate stats
  const totalRevenue = data.reduce((sum, d) => sum + d.totalRevenue, 0);
  const totalOrders = data.reduce((sum, d) => sum + (d.orders || 0), 0);
  const avgRevenue = totalRevenue / data.length;
  const topPerformer = data.reduce((prev, current) =>
    current.totalRevenue > prev.totalRevenue ? current : prev
  );

  const hasOrders = data.some(d => d.orders !== undefined);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <BarChart3 size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Biểu đồ so sánh
              </h3>
              <p className="text-sm text-gray-600">
                Phân tích hiệu suất nhân viên
              </p>
            </div>
          </div>

          {/* Metric Toggle */}
          {hasOrders && (
            <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
              <button
                onClick={() => setSelectedMetric("revenue")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                  selectedMetric === "revenue"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <DollarSign size={16} />
                <span>Doanh thu</span>
              </button>
              <button
                onClick={() => setSelectedMetric("orders")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                  selectedMetric === "orders"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ShoppingCart size={16} />
                <span>Đơn hàng</span>
              </button>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={16} className="text-blue-600" />
              <p className="text-xs text-gray-600 font-medium">Tổng doanh thu</p>
            </div>
            <p className="text-lg font-bold text-blue-600">
              {(totalRevenue / 1000000).toFixed(1)}M
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
            <div className="flex items-center gap-2 mb-1">
              <ShoppingCart size={16} className="text-green-600" />
              <p className="text-xs text-gray-600 font-medium">Tổng đơn hàng</p>
            </div>
            <p className="text-lg font-bold text-green-600">
              {totalOrders}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} className="text-purple-600" />
              <p className="text-xs text-gray-600 font-medium">Trung bình</p>
            </div>
            <p className="text-lg font-bold text-purple-600">
              {(avgRevenue / 1000000).toFixed(1)}M
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} className="text-orange-600" />
              <p className="text-xs text-gray-600 font-medium">Cao nhất</p>
            </div>
            <p className="text-sm font-bold text-orange-600 truncate">
              {topPerformer.staffName}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        <div className="w-full" style={{ height: "400px" }}>
          <BarChart data={chartData} options={options} />
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-gray-50 border-t border-gray-100 p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <span>
              Hiển thị dữ liệu của <span className="font-bold text-gray-900">{data.length}</span> nhân viên
            </span>
          </div>
          <span className="text-xs">
            Cập nhật: {new Date().toLocaleDateString("vi-VN")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;