import React from "react";
import {
  Settings,
  Layers,
  Tag,
  Eye,
  User,
  Building2,
  Mail,
  Info,
  CheckCircle2,
  Zap
} from "lucide-react";

export default function FormComplicated() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <Settings size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Cài đặt nâng cao</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Promotion Settings */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={20} className="text-blue-600" />
            <h3 className="font-bold text-gray-900">Cấu hình khuyến mãi</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Layers size={16} className="text-blue-600" />
                Kết hợp khuyến mãi
              </label>
              <select
                name="stackable"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="false">❌ Không</option>
                <option value="true">✅ Có</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                Cho phép áp dụng nhiều mã cùng lúc
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Tag size={16} className="text-indigo-600" />
                Yêu cầu mã KM
              </label>
              <select
                name="requireCode"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-indigo-500 transition-all"
              >
                <option value="true" selected>
                  🔑 Có (nhập mã)
                </option>
                <option value="false">⚡ Không (tự động)</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                Khách hàng phải nhập mã để sử dụng
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Eye size={16} className="text-purple-600" />
                Hiển thị website
              </label>
              <select
                name="showOnWebsite"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-purple-500 transition-all"
              >
                <option value="true" selected>
                  👁️ Hiển thị
                </option>
                <option value="false">🔒 Ẩn</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                Khuyến mãi có hiển thị công khai
              </p>
            </div>
          </div>
        </div>

        {/* Management Info */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={20} className="text-green-600" />
            <h3 className="font-bold text-gray-900">Thông tin quản lý</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <User size={16} className="text-green-600" />
                Người tạo
              </label>
              <input
                type="text"
                name="createdBy"
                placeholder="VD: Nguyễn Văn A"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-green-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                Tên người tạo chương trình
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Building2 size={16} className="text-emerald-600" />
                Bộ phận phụ trách
              </label>
              <select
                name="department"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-emerald-500 transition-all"
              >
                <option value="">Chọn bộ phận</option>
                <option value="marketing">📢 Marketing</option>
                <option value="sales">💼 Sales</option>
                <option value="customer_service">🤝 Chăm sóc KH</option>
                <option value="management">👔 Ban giám đốc</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                Bộ phận chịu trách nhiệm
              </p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail size={20} className="text-orange-600" />
            <h3 className="font-bold text-gray-900">Cài đặt thông báo</h3>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <Mail size={16} className="text-orange-600" />
              Email nhận thông báo
            </label>
            <input
              type="email"
              name="notificationEmail"
              placeholder="admin@company.com"
              className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-orange-500 transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">
              📧 Email nhận thông báo về tình trạng khuyến mãi
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-purple-50 border-l-4 border-purple-600 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-purple-900 mb-1">
                Lưu ý về cài đặt nâng cao
              </p>
              <ul className="text-sm text-purple-800 space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Khuyến mãi kết hợp cho phép áp dụng nhiều mã cùng lúc
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Khuyến mãi tự động sẽ áp dụng ngay khi đủ điều kiện
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Email thông báo dùng để nhận cảnh báo về hiệu suất
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
