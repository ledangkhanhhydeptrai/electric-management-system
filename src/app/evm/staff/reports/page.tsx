"use client";
import React from "react";
import {
  MapPin,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Target,
  Eye,
  Download,
  Filter
} from "lucide-react";
import { SalesChart } from "./components/SalesChart";
import { AIForecastPage } from "./AIForeCastPage";
import { InventoryReportPage } from "./InventoryReportPage";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

export default function RegionalSalesPage() {
  useAuthGuard(["EVM Staff"]);
  const regions = [
    {
      id: 1,
      name: "Miền Bắc",
      sales: 320,
      change: 12.5,
      trend: "up",
      target: 400,
      revenue: "24.5 tỷ",
      dealers: 15
    },
    {
      id: 2,
      name: "Miền Trung",
      sales: 180,
      change: -3.2,
      trend: "down",
      target: 250,
      revenue: "13.8 tỷ",
      dealers: 8
    },
    {
      id: 3,
      name: "Miền Nam",
      sales: 450,
      change: 18.7,
      trend: "up",
      target: 500,
      revenue: "34.2 tỷ",
      dealers: 22
    }
  ];

  const totalSales = regions.reduce((sum, region) => sum + region.sales, 0);
  const totalRevenue = "72.5 tỷ";
  const avgGrowth = (
    regions.reduce((sum, r) => sum + r.change, 0) / regions.length
  ).toFixed(1);

  return (
    <div className="text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
              Doanh số theo khu vực
            </h1>
            <p className="text-slate-600 text-lg">
              Theo dõi và phân tích doanh số bán hàng theo từng khu vực
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Filter className="w-5 h-5" />
              Lọc
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              <Download className="w-5 h-5" />
              Xuất báo cáo
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                {avgGrowth}%
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-1">Tổng doanh số</p>
            <p className="text-3xl font-bold text-slate-800">{totalSales}</p>
            <p className="text-xs text-slate-500 mt-1">xe trong tháng</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Doanh thu</p>
            <p className="text-3xl font-bold text-slate-800">{totalRevenue}</p>
            <p className="text-xs text-slate-500 mt-1">VNĐ</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Khu vực</p>
            <p className="text-3xl font-bold text-slate-800">
              {regions.length}
            </p>
            <p className="text-xs text-slate-500 mt-1">đang hoạt động</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Đạt chỉ tiêu</p>
            <p className="text-3xl font-bold text-slate-800">83%</p>
            <p className="text-xs text-slate-500 mt-1">
              trung bình các khu vực
            </p>
          </div>
        </div>

        {/* Sales Chart */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Biểu đồ doanh số
              </h2>
              <p className="text-slate-600 mt-1">Theo dõi xu hướng bán hàng</p>
            </div>
          </div>
          <SalesChart />
        </section>

        {/* Regional Cards */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Chi tiết theo khu vực
              </h2>
              <p className="text-slate-600 mt-1">
                Phân tích hiệu suất từng khu vực
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regions.map((region) => (
              <div
                key={region.id}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className={`h-2 bg-gradient-to-r ${
                    region.trend === "up"
                      ? "from-green-500 to-emerald-600"
                      : "from-red-500 to-orange-600"
                  }`}
                ></div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          region.trend === "up" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        <MapPin
                          className={`w-5 h-5 ${
                            region.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">
                        {region.name}
                      </h3>
                    </div>
                    <div
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        region.trend === "up"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {region.trend === "up" ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {Math.abs(region.change)}%
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-slate-600 mb-1">
                      Doanh số tháng này
                    </p>
                    <p className="text-4xl font-bold text-slate-800">
                      {region.sales}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">xe</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600">Tiến độ chỉ tiêu</span>
                      <span className="font-semibold">
                        {region.sales}/{region.target}
                      </span>
                    </div>
                    <div className="bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-full rounded-full ${
                          region.trend === "up"
                            ? "bg-gradient-to-r from-green-500 to-emerald-600"
                            : "bg-gradient-to-r from-orange-500 to-red-600"
                        }`}
                        style={{
                          width: `${(region.sales / region.target) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-slate-600 mb-1">Doanh thu</p>
                      <p className="text-lg font-bold text-blue-600">
                        {region.revenue}
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs text-slate-600 mb-1">Đại lý</p>
                      <p className="text-lg font-bold text-purple-600">
                        {region.dealers}
                      </p>
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 border-2 border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Forecast */}
        <section>
          <AIForecastPage />
        </section>

        {/* Inventory Report */}
        <section>
          <InventoryReportPage />
        </section>
      </div>
    </div>
  );
}
