import React from "react";
import {
  Link2,
  Database,
  Cloud,
  Key,
  Shield,
  Webhook,
  Info,
  CheckCircle2,
  AlertCircle,
  Lock
} from "lucide-react";

export default function System() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <Link2 size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Tích hợp hệ thống</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Business Systems */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database size={20} className="text-blue-600" />
            <h3 className="font-bold text-gray-900">Hệ thống kinh doanh</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Cloud size={16} className="text-blue-600" />
                Hệ thống CRM
              </label>
              <select
                name="crmIntegration"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="">❌ Không tích hợp</option>
                <option value="salesforce">☁️ Salesforce</option>
                <option value="hubspot">🟠 HubSpot</option>
                <option value="custom">🏢 Hệ thống nội bộ</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                👥 Quản lý quan hệ khách hàng
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Database size={16} className="text-indigo-600" />
                Hệ thống ERP
              </label>
              <select
                name="erpIntegration"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-indigo-500 transition-all"
              >
                <option value="">❌ Không tích hợp</option>
                <option value="sap">💼 SAP</option>
                <option value="oracle">🔴 Oracle</option>
                <option value="custom">🏢 Hệ thống nội bộ</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                📊 Hoạch định nguồn lực doanh nghiệp
              </p>
            </div>
          </div>
        </div>

        {/* API Integration */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Webhook size={20} className="text-purple-600" />
            <h3 className="font-bold text-gray-900">Tích hợp API</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Webhook size={16} className="text-purple-600" />
                Webhook URL
              </label>
              <input
                type="url"
                name="webhookUrl"
                placeholder="https://api.company.com/webhook"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-purple-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                🔗 Endpoint nhận thông báo realtime
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Key size={16} className="text-pink-600" />
                API Key
              </label>
              <input
                type="password"
                name="apiKey"
                placeholder="••••••••••••••••"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-pink-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                🔑 Khóa xác thực API (bắt buộc nếu có)
              </p>
            </div>
          </div>
        </div>

        {/* Integration Status */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={20} className="text-green-600" />
            <h3 className="font-bold text-gray-900">Trạng thái tích hợp</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <p className="text-xs font-bold text-gray-600">CRM</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                Chưa kết nối
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <p className="text-xs font-bold text-gray-600">ERP</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                Chưa kết nối
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <p className="text-xs font-bold text-gray-600">Webhook</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                Chưa cấu hình
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Lock size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-orange-900 mb-1">
                🔒 Bảo mật thông tin
              </p>
              <ul className="text-sm text-orange-800 space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>API Key được mã hóa và lưu trữ an toàn</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Webhook sử dụng HTTPS và xác thực signature</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Chỉ admin mới có quyền xem và chỉnh sửa</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-blue-900 mb-1">
                Hướng dẫn tích hợp
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    CRM: Đồng bộ thông tin khách hàng và lịch sử giao dịch
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>ERP: Tự động cập nhật tồn kho và đơn hàng</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Webhook: Nhận thông báo realtime về các sự kiện</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Liên hệ IT để được hỗ trợ thiết lập chi tiết</span>
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
                ⚠️ Lưu ý quan trọng
              </p>
              <p className="text-sm text-yellow-800">
                Kiểm tra kỹ URL và API Key trước khi lưu. Cấu hình sai có thể
                gây lỗi đồng bộ dữ liệu hoặc rò rỉ thông tin. Khuyến nghị test
                trong môi trường staging trước khi áp dụng production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
