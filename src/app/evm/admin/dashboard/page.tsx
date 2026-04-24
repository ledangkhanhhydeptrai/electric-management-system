"use client";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { aiPrediction } from "@/app/types/AI/AITax";
import { consumptionRate } from "@/app/types/consumptionRate/consumption";
import { regionSales } from "@/app/types/regionSales/region";
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle,
  DollarSign,
  Package,
  TrendingUp,
  Users,
  BarChart3,
  MapPin,
  Sparkles,
  Target,
  Activity,
  Calendar
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const DashboardView = () => {
  useAuthGuard(["Administrator"]);
  return (
    <div className="mt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 space-y-6">
      {/* Header */}
      {/* <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30">
              <Activity size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Dashboard Tổng Quan
              </h1>
              <p className="text-blue-100">
                Cập nhật: {new Date().toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>
          <div className="hidden md:flex gap-3">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30 text-white font-semibold transition-all flex items-center gap-2">
              <Calendar size={18} />
              <span>Tháng này</span>
            </button>
          </div>
        </div>
      </div> */}

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 h-2"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Package className="w-7 h-7 text-blue-600" />
              </div>
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                LIVE
              </div>
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">Tổng tồn kho</p>
            <p className="text-3xl font-bold text-gray-900 mb-3">460 xe</p>
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <ArrowUpRight className="w-4 h-4" />
              <span>+12% so với tháng trước</span>
            </div>
          </div>
        </div>

        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 h-2"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-green-600" />
              </div>
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                +3
              </div>
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">Tổng đại lý</p>
            <p className="text-3xl font-bold text-gray-900 mb-3">45</p>
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <ArrowUpRight className="w-4 h-4" />
              <span>+3 đại lý mới</span>
            </div>
          </div>
        </div>

        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 h-2"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-amber-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <DollarSign className="w-7 h-7 text-amber-600" />
              </div>
              <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                +11.4%
              </div>
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">
              Doanh thu tháng
            </p>
            <p className="text-3xl font-bold text-gray-900 mb-3">334.8 tỷ</p>
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>+11.4% tăng trưởng</span>
            </div>
          </div>
        </div>

        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1">
          <div className="bg-gradient-to-br from-red-50 to-pink-50 h-2"></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <AlertCircle className="w-7 h-7 text-red-600" />
              </div>
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                !
              </div>
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">
              Công nợ chưa thu
            </p>
            <p className="text-3xl font-bold text-gray-900 mb-3">4.45 tỷ</p>
            <div className="flex items-center gap-1 text-red-600 text-sm font-semibold">
              <AlertCircle className="w-4 h-4" />
              <span>1 đại lý quá hạn</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* Charts Section */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <BarChart3 size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Tốc độ tiêu thụ 6 tháng
                </h3>
                <p className="text-sm text-gray-600">
                  Phân tích xu hướng bán hàng
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={consumptionRate}>
                <defs>
                  <linearGradient id="colorSold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(17, 24, 39, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    padding: "12px"
                  }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#94a3b8"
                  fill="url(#colorTotal)"
                  name="Tồn kho"
                />
                <Area
                  type="monotone"
                  dataKey="sold"
                  stroke="#3b82f6"
                  fill="url(#colorSold)"
                  name="Đã bán"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <MapPin size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Doanh số theo khu vực
                </h3>
                <p className="text-sm text-gray-600">Top 4 vùng miền</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {regionSales.map((region, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {idx + 1}
                      </div>
                      <span className="font-bold text-gray-900">
                        {region.region}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-bold flex items-center gap-1 px-2 py-1 rounded-lg ${
                        region.growth > 0
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {region.growth > 0 ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {Math.abs(region.growth)}%
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 mb-2 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Package size={14} />
                      {region.sold} xe
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign size={14} />
                      {(region.revenue / 1000000000).toFixed(1)} tỷ
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${(region.sold / 744) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}

      {/* AI Prediction Section */}
      <div className="bg-white overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl">
                <Sparkles size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  AI Dự báo nhu cầu & Kế hoạch sản xuất
                </h3>
                <p className="text-purple-100 text-sm">
                  Phân tích dữ liệu 12 tháng + xu hướng thị trường
                </p>
              </div>
            </div>
            <button className="bg-white hover:bg-gray-100 px-6 py-3 rounded-xl text-purple-600 font-bold transition-all shadow-lg flex items-center gap-2 group">
              <span>Xem chi tiết</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={aiPrediction}>
              <defs>
                <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient
                  id="productionGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(17, 24, 39, 0.95)",
                  border: "none",
                  borderRadius: "12px",
                  padding: "12px"
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Bar
                dataKey="demand"
                fill="url(#demandGradient)"
                name="Dự báo nhu cầu"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="production"
                fill="url(#productionGradient)"
                name="Kế hoạch sản xuất"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-green-500 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-gray-900">
                  Khuyến nghị ngay
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Tăng sản xuất 15% trong Q4 để đáp ứng nhu cầu cao điểm cuối năm
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-gray-900">
                  Ưu tiên phân phối
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Miền Nam (+18% tăng trưởng) và Miền Bắc (+12% tăng trưởng)
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-amber-500 p-2 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-gray-900">Cảnh báo</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Miền Trung giảm 5%, cần review lại chiến lược marketing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
