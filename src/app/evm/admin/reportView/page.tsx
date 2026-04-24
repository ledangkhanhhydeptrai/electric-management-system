"use client";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { aiPrediction } from "@/app/types/AI/AITax";
import { consumptionRate } from "@/app/types/consumptionRate/consumption";
import { dealers } from "@/app/types/dealers/dealers";
import { regionSales } from "@/app/types/regionSales/region";
import {
  AlertCircle,
  CheckCircle,
  Gift,
  Package,
  TrendingUp,
  Users
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const ReportsView = () => {
  useAuthGuard(["Administrator"]);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Báo cáo & Phân tích
        </h2>
        <p className="text-gray-600 mt-1">Doanh số, tồn kho & dự báo AI</p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              Doanh số theo khu vực
            </h3>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          {regionSales.map((region, idx) => (
            <div
              key={idx}
              className="mb-3 pb-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-gray-900">
                  {region.region}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    region.growth > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {region.growth > 0 ? "+" : ""}
                  {region.growth}%
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{region.dealers} đại lý</span>
                <span>{region.sold} xe</span>
                <span>{(region.revenue / 1000000000).toFixed(1)} tỷ</span>
              </div>
            </div>
          ))}
          <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            Xem báo cáo chi tiết
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Tốc độ tiêu thụ</h3>
            <Package className="w-5 h-5 text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={consumptionRate}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-gray-900">91.2%</p>
            <p className="text-sm text-gray-600">Tỷ lệ tiêu thụ trung bình</p>
          </div>
          <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            Phân tích xu hướng
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Top đại lý</h3>
            <Users className="w-5 h-5 text-amber-600" />
          </div>
          {dealers
            .sort((a, b) => b.sold - a.sold)
            .map((dealer, idx) => (
              <div
                key={dealer.id}
                className="mb-3 pb-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-400">#{idx + 1}</span>
                  <span className="font-medium text-gray-900">
                    {dealer.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{dealer.sold} xe bán</span>
                  <span className="font-semibold text-blue-600">
                    {(dealer.revenue / 1000000000).toFixed(1)} tỷ
                  </span>
                </div>
              </div>
            ))}
          <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            Xem bảng xếp hạng
          </button>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                AI Insights - Dự báo & Khuyến nghị
              </h3>
              <p className="text-sm text-gray-600">
                Cập nhật: 03/10/2024 15:30
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
            Tải báo cáo đầy đủ
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Dự báo 4 tháng tới
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={aiPrediction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="demand" fill="#8b5cf6" name="Nhu cầu" />
                <Bar dataKey="production" fill="#3b82f6" name="Sản xuất" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 mb-3">
              Khuyến nghị hành động
            </h4>

            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-gray-900">
                    Tăng sản xuất ngay
                  </h5>
                  <p className="text-sm text-gray-700 mt-1">
                    Tăng 15% công suất sản xuất trong Q4/2024 để đáp ứng nhu cầu
                    cao điểm. Dự báo thiếu hụt 70 xe nếu giữ nguyên kế hoạch.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-gray-900">
                    Ưu tiên phân phối
                  </h5>
                  <p className="text-sm text-gray-700 mt-1">
                    Phân bổ 40% tồn kho cho Miền Nam (tăng trưởng +18%), 35%
                    Miền Bắc (+12%), 25% Miền Trung (-5%).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-l-4 border-amber-500">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-gray-900">
                    Cảnh báo Miền Trung
                  </h5>
                  <p className="text-sm text-gray-700 mt-1">
                    Doanh số Miền Trung giảm 5% liên tiếp 2 tháng. Cần review
                    lại chiến lược marketing và hỗ trợ đại lý trong khu vực.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-gray-900">
                    Cơ hội khuyến mãi
                  </h5>
                  <p className="text-sm text-gray-700 mt-1">
                    Model EVM-S2 có tốc độ tiêu thụ chậm. Đề xuất chương trình
                    khuyến mãi 8-10% trong tháng 11 để tăng tốc bán hàng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportsView;
