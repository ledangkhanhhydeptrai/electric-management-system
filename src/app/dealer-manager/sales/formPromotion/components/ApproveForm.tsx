import React from "react";
import {
  CheckCircle2,
  UserCheck,
  Mail,
  Shield,
  FileText,
  AlertCircle
} from "lucide-react";

export default function ApproveForm() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <CheckCircle2 size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Xác nhận và phê duyệt
          </h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Approval Settings */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <UserCheck size={20} className="text-blue-600" />
            <h3 className="font-bold text-gray-900">Cài đặt phê duyệt</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Shield size={16} className="text-blue-600" />
                Cần phê duyệt
              </label>
              <select
                name="requiresApproval"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="false">Không</option>
                <option value="true" selected>
                  Có
                </option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Mail size={16} className="text-green-600" />
                Người phê duyệt
              </label>
              <input
                type="email"
                name="approverEmail"
                placeholder="approver@company.com"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-green-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Agreement Checkboxes */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={20} className="text-purple-600" />
            <h3 className="font-bold text-gray-900">Điều khoản & Điều kiện</h3>
          </div>
          <div className="space-y-4">
            {[
              {
                text: "Tôi xác nhận rằng tất cả thông tin đã cung cấp là chính xác",
                required: true
              },
              {
                text: "Tôi đồng ý với các điều khoản và điều kiện của công ty",
                required: true
              },
              {
                text: "Tôi hiểu rằng chương trình khuyến mãi cần được phê duyệt trước khi triển khai",
                required: false
              },
              {
                text: "Tôi chịu trách nhiệm về tính hiệu quả và tuân thủ pháp luật của chương trình",
                required: false
              }
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200 hover:border-purple-300 transition-all"
              >
                <input
                  type="checkbox"
                  name={`agreement_${index + 1}`}
                  required={item.required}
                  className="mt-0.5 h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
                />
                <label className="text-sm text-gray-700 leading-relaxed cursor-pointer flex-1">
                  {item.text}
                  {item.required && (
                    <span className="text-red-500 font-bold ml-1">*</span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={20} className="text-orange-600" />
            <h3 className="font-bold text-gray-900">Ghi chú</h3>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-2">
              Ghi chú cho người phê duyệt
            </label>
            <textarea
              name="approvalNotes"
              rows={4}
              placeholder="Thông tin bổ sung cho người phê duyệt..."
              className="p-4 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-orange-500 transition-all resize-none"
            />
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle
            size={20}
            className="text-blue-600 flex-shrink-0 mt-0.5"
          />
          <div>
            <p className="text-sm text-blue-900 font-semibold mb-1">
              Lưu ý quan trọng
            </p>
            <p className="text-sm text-blue-800">
              Sau khi gửi, thông tin sẽ được chuyển đến người phê duyệt. Bạn sẽ
              nhận được thông báo khi đơn được xử lý.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
