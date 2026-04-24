import React from "react";
import {
  FileText,
  Tag,
  Activity,
  Flag,
  Info,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function SimpleForm() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <FileText size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Thông tin cơ bản</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Program Info */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Tag size={20} className="text-blue-600" />
            <h3 className="font-bold text-gray-900">Tên & Mã chương trình</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <FileText size={16} className="text-blue-600" />
                Tên chương trình <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="promoName"
                placeholder="VD: Giảm giá đặc biệt mùa hè"
                required
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-blue-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                📝 Tên hiển thị của chương trình khuyến mãi
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Tag size={16} className="text-indigo-600" />
                Mã khuyến mãi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="promoCode"
                placeholder="VD: SUMMER2024"
                required
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-indigo-500 transition-all uppercase"
              />
              <p className="text-xs text-gray-500 mt-2">
                🏷️ Mã duy nhất để khách hàng sử dụng
              </p>
            </div>
          </div>
        </div>

        {/* Status & Priority */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={20} className="text-purple-600" />
            <h3 className="font-bold text-gray-900">Trạng thái & Độ ưu tiên</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Activity size={16} className="text-purple-600" />
                Trạng thái <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                required
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-purple-500 transition-all"
              >
                <option value="">Chọn trạng thái</option>
                <option value="draft">📝 Bản nháp</option>
                <option value="active">✅ Đang hoạt động</option>
                <option value="scheduled">📅 Đã lên lịch</option>
                <option value="paused">⏸️ Tạm dừng</option>
                <option value="expired">❌ Hết hạn</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                🔄 Trạng thái hiện tại của chương trình
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Flag size={16} className="text-pink-600" />
                Độ ưu tiên
              </label>
              <select
                name="priority"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-pink-500 transition-all"
              >
                <option value="low">🟢 Thấp</option>
                <option value="normal" selected>
                  🟡 Bình thường
                </option>
                <option value="high">🟠 Cao</option>
                <option value="urgent">🔴 Khẩn cấp</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                ⚡ Mức độ ưu tiên khi hiển thị
              </p>
            </div>
          </div>
        </div>

        {/* Status Legend */}
        <div className="bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info size={20} className="text-gray-600" />
            <h3 className="font-bold text-gray-900">Giải thích trạng thái</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2 text-sm">
              <span className="text-lg">📝</span>
              <div>
                <p className="font-semibold text-gray-900">Bản nháp</p>
                <p className="text-gray-600">
                  Chưa được kích hoạt, có thể chỉnh sửa
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-lg">✅</span>
              <div>
                <p className="font-semibold text-gray-900">Đang hoạt động</p>
                <p className="text-gray-600">
                  Đang chạy và khách hàng có thể sử dụng
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-lg">📅</span>
              <div>
                <p className="font-semibold text-gray-900">Đã lên lịch</p>
                <p className="text-gray-600">
                  Tự động kích hoạt vào thời gian đã đặt
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-lg">⏸️</span>
              <div>
                <p className="font-semibold text-gray-900">Tạm dừng</p>
                <p className="text-gray-600">Tạm ngừng, có thể kích hoạt lại</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-blue-900 mb-1">
                Lưu ý quan trọng
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Tên chương trình nên ngắn gọn, dễ nhớ và thu hút</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Mã khuyến mãi phải duy nhất, không trùng lặp trong hệ thống
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Sử dụng chữ in hoa và không có khoảng trắng cho mã KM
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Trạng thái Bản nháp cho phép chỉnh sửa thoải mái</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Warning Alert */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle
              size={20}
              className="text-yellow-600 flex-shrink-0 mt-0.5"
            />
            <div>
              <p className="text-sm font-bold text-yellow-900 mb-1">
                ⚠️ Cảnh báo
              </p>
              <p className="text-sm text-yellow-800">
                Sau khi chương trình chuyển sang trạng thái Đang hoạt động, một
                số thông tin quan trọng sẽ không thể thay đổi để đảm bảo tính
                công bằng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SimpleForm.appendData = async (formData: FormData) => {
  // Giả sử ở đây bạn có dữ liệu từ input hoặc state
  const promoName = "Giảm giá 50%";
  const promoCode = "SALE50";

  // ✅ append vào FormData từ file con
  formData.append("promoName", promoName);
  formData.append("promoCode", promoCode);
};
