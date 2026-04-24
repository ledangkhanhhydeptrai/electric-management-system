import React from "react";
import {
  Calendar,
  Clock,
  Globe,
  Play,
  StopCircle,
  Info,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function FormTime() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <Calendar size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Thời gian áp dụng</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Start & End Date */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} className="text-blue-600" />
            <h3 className="font-bold text-gray-900">Thời gian hiệu lực</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Play size={16} className="text-blue-600" />
                Ngày bắt đầu <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="startDate"
                required
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-blue-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                🕐 Thời điểm chương trình bắt đầu
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <StopCircle size={16} className="text-indigo-600" />
                Ngày kết thúc <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="endDate"
                required
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-indigo-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                🕙 Thời điểm chương trình kết thúc
              </p>
            </div>
          </div>
        </div>

        {/* Timezone & Auto End */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={20} className="text-purple-600" />
            <h3 className="font-bold text-gray-900">Cài đặt bổ sung</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Globe size={16} className="text-purple-600" />
                Múi giờ
              </label>
              <select
                name="timezone"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-purple-500 transition-all"
              >
                <option value="UTC+7" selected>
                  🇻🇳 UTC+7 (Việt Nam)
                </option>
                <option value="UTC+0">🌍 UTC+0 (GMT)</option>
                <option value="UTC+8">🇸🇬 UTC+8 (Singapore)</option>
                <option value="UTC+9">🇯🇵 UTC+9 (Nhật Bản)</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                🌐 Múi giờ áp dụng cho chương trình
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <StopCircle size={16} className="text-pink-600" />
                Tự động kết thúc
              </label>
              <select
                name="autoEnd"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-pink-500 transition-all"
              >
                <option value="false">❌ Không</option>
                <option value="true" selected>
                  ✅ Có
                </option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                ⏱️ Tự động vô hiệu hóa sau khi hết hạn
              </p>
            </div>
          </div>
        </div>

        {/* Duration Info */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} className="text-green-600" />
            <h3 className="font-bold text-gray-900">Thời lượng chương trình</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={16} className="text-green-600" />
                <p className="text-xs font-bold text-gray-600">
                  Tổng thời gian
                </p>
              </div>
              <p className="text-lg font-bold text-gray-900">Tính tự động</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} className="text-green-600" />
                <p className="text-xs font-bold text-gray-600">Giờ còn lại</p>
              </div>
              <p className="text-lg font-bold text-gray-900">Chưa bắt đầu</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle size={16} className="text-green-600" />
                <p className="text-xs font-bold text-gray-600">Trạng thái</p>
              </div>
              <p className="text-lg font-bold text-gray-900">Chờ kích hoạt</p>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-yellow-900 mb-1">
                Lưu ý về thời gian
              </p>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Thời gian bắt đầu phải sớm hơn thời gian kết thúc</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Múi giờ mặc định là UTC+7 (Giờ Việt Nam)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Nếu bật tự động kết thúc, chương trình sẽ dừng ngay khi hết
                    hạn
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Khuyến nghị đặt thời gian rõ ràng để tránh nhầm lẫn
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
