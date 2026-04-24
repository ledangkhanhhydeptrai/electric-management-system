import React from "react";
import {
  BarChart3,
  Target,
  Users,
  DollarSign,
  TrendingUp,
  Mail,
  Clock,
  Award,
  Info,
  CheckCircle2,
  PieChart,
  Activity
} from "lucide-react";

export default function Report() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <BarChart3 size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Báo cáo & Phân tích</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Targets */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target size={20} className="text-blue-600" />
            <h3 className="font-bold text-gray-900">Mục tiêu chiến dịch</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign size={16} className="text-blue-600" />
                Mục tiêu doanh số (VNĐ)
              </label>
              <input
                type="number"
                name="salesTarget"
                placeholder="VD: 1000000000"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-blue-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                💰 Doanh thu mục tiêu từ chương trình
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Users size={16} className="text-indigo-600" />
                Mục tiêu số lượng khách hàng
              </label>
              <input
                type="number"
                name="customerTarget"
                placeholder="VD: 500"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-indigo-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                👥 Số khách hàng dự kiến tham gia
              </p>
            </div>
          </div>
        </div>

        {/* Budget & KPI */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-green-600" />
            <h3 className="font-bold text-gray-900">Ngân sách & KPI</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign size={16} className="text-green-600" />
                Ngân sách marketing (VNĐ)
              </label>
              <input
                type="number"
                name="marketingBudget"
                placeholder="VD: 100000000"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-green-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                💵 Tổng chi phí cho chiến dịch marketing
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Award size={16} className="text-emerald-600" />
                KPI chính
              </label>
              <select
                name="primaryKPI"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-emerald-500 transition-all"
              >
                <option value="">Chọn KPI</option>
                <option value="revenue">💰 Doanh thu</option>
                <option value="customer_acquisition">🎯 Thu hút KH mới</option>
                <option value="customer_retention">🤝 Giữ chân KH</option>
                <option value="brand_awareness">📢 Nhận diện TH</option>
                <option value="market_share">📊 Thị phần</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                🎯 Chỉ số đo lường hiệu quả chính
              </p>
            </div>
          </div>
        </div>

        {/* Reporting Settings */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={20} className="text-purple-600" />
            <h3 className="font-bold text-gray-900">Cài đặt báo cáo</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Clock size={16} className="text-purple-600" />
                Tần suất báo cáo
              </label>
              <select
                name="reportingFrequency"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-purple-500 transition-all"
              >
                <option value="daily">📅 Hàng ngày</option>
                <option value="weekly" selected>
                  📆 Hàng tuần
                </option>
                <option value="monthly">🗓️ Hàng tháng</option>
                <option value="real_time">⚡ Thời gian thực</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                🕐 Tần suất gửi báo cáo tự động
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Mail size={16} className="text-pink-600" />
                Người nhận báo cáo
              </label>
              <input
                type="email"
                name="reportRecipient"
                placeholder="manager@company.com"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-pink-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                📧 Email nhận báo cáo định kỳ
              </p>
            </div>
          </div>
        </div>

        {/* Performance Metrics Preview */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <PieChart size={20} className="text-orange-600" />
            <h3 className="font-bold text-gray-900">Chỉ số hiệu suất</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-orange-200">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-orange-600" />
                <p className="text-xs font-bold text-gray-600">ROI dự kiến</p>
              </div>
              <p className="text-lg font-bold text-gray-900">Tính sau</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-orange-200">
              <div className="flex items-center gap-2 mb-1">
                <Users size={16} className="text-orange-600" />
                <p className="text-xs font-bold text-gray-600">
                  Tỷ lệ chuyển đổi
                </p>
              </div>
              <p className="text-lg font-bold text-gray-900">Tính sau</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-orange-200">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign size={16} className="text-orange-600" />
                <p className="text-xs font-bold text-gray-600">Chi phí/KH</p>
              </div>
              <p className="text-lg font-bold text-gray-900">Tính sau</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-orange-200">
              <div className="flex items-center gap-2 mb-1">
                <Award size={16} className="text-orange-600" />
                <p className="text-xs font-bold text-gray-600">
                  Tỷ lệ thành công
                </p>
              </div>
              <p className="text-lg font-bold text-gray-900">Tính sau</p>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-blue-900 mb-1">
                Hướng dẫn thiết lập báo cáo
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Mục tiêu rõ ràng giúp đo lường hiệu quả chính xác hơn
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    KPI phù hợp với mục tiêu kinh doanh của từng chiến dịch
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Tần suất báo cáo nên phù hợp với chu kỳ chiến dịch
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Email người nhận báo cáo nên là người có thẩm quyền quyết
                    định
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success Tip */}
        <div className="bg-green-50 border-l-4 border-green-600 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2
              size={20}
              className="text-green-600 flex-shrink-0 mt-0.5"
            />
            <div>
              <p className="text-sm font-bold text-green-900 mb-1">
                💡 Tips để tối ưu hiệu quả
              </p>
              <p className="text-sm text-green-800">
                Theo dõi các chỉ số định kỳ và điều chỉnh chiến dịch kịp thời.
                ROI tốt thường đến từ việc phân tích dữ liệu liên tục và tối ưu
                hóa dựa trên insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
