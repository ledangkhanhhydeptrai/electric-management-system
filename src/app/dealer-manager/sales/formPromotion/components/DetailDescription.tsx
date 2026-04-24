import React from "react";
import {
  FileText,
  AlignLeft,
  Shield,
  BookOpen,
  Info,
  CheckCircle
} from "lucide-react";

export default function DetailDescription() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <FileText size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Mô tả & Điều khoản</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Short Description */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlignLeft size={20} className="text-blue-600" />
            <h3 className="font-bold text-gray-900">Mô tả ngắn</h3>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-2">
              Tóm tắt chương trình
            </label>
            <textarea
              name="shortDescription"
              rows={3}
              placeholder="Mô tả ngắn gọn về chương trình khuyến mãi (tối đa 200 ký tự)..."
              className="p-4 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Mô tả ngắn sẽ hiển thị trong danh sách khuyến mãi
            </p>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={20} className="text-purple-600" />
            <h3 className="font-bold text-gray-900">Mô tả chi tiết</h3>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-2">
              Thông tin đầy đủ
            </label>
            <textarea
              name="detailedDescription"
              rows={5}
              placeholder="Mô tả chi tiết về chương trình, lợi ích, cách thức áp dụng, đối tượng hưởng lợi..."
              className="p-4 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-purple-500 transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              📝 Bao gồm tất cả thông tin quan trọng về chương trình
            </p>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={20} className="text-red-600" />
            <h3 className="font-bold text-gray-900">Điều khoản & Điều kiện</h3>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-2">
              Quy định áp dụng
            </label>
            <textarea
              name="termsConditions"
              rows={5}
              placeholder="Các điều khoản, điều kiện áp dụng, hạn chế, trường hợp không được áp dụng..."
              className="p-4 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-red-500 transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              ⚠️ Liệt kê rõ ràng các điều khoản để tránh hiểu nhầm
            </p>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={20} className="text-green-600" />
            <h3 className="font-bold text-gray-900">Hướng dẫn sử dụng</h3>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-2">
              Cách thức áp dụng
            </label>
            <textarea
              name="usageInstructions"
              rows={4}
              placeholder="Hướng dẫn chi tiết cách sử dụng mã khuyến mãi, các bước thực hiện, lưu ý khi sử dụng..."
              className="p-4 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-green-500 transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              ✅ Hướng dẫn từng bước để khách hàng dễ thực hiện
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-yellow-900 mb-1">
                Lưu ý quan trọng
              </p>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Mô tả rõ ràng, dễ hiểu để khách hàng nắm bắt nhanh
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Điều khoản phải tuân thủ pháp luật bảo vệ người tiêu dùng
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Hướng dẫn chi tiết giúp giảm thiểu thắc mắc từ khách hàng
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
