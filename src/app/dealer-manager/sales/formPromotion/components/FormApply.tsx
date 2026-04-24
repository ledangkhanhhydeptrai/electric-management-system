import React from "react";
import {
  Car,
  Tag,
  Filter,
  Package,
  XCircle,
  Award,
  Info,
  CheckCircle2,
  Grid3x3
} from "lucide-react";

export default function FormApply() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <Car size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Sản phẩm & Danh mục áp dụng
          </h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Application Type */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-blue-600" />
            <h3 className="font-bold text-gray-900">Phạm vi áp dụng</h3>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <Tag size={16} className="text-blue-600" />
              Loại áp dụng <span className="text-red-500">*</span>
            </label>
            <select
              name="applicationType"
              required
              className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-blue-500 transition-all"
            >
              <option value="">Chọn phạm vi</option>
              <option value="all">🌐 Tất cả sản phẩm</option>
              <option value="category">📁 Theo danh mục</option>
              <option value="specific">🎯 Sản phẩm cụ thể</option>
              <option value="brand">🏷️ Theo thương hiệu</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              💡 Chọn phạm vi áp dụng cho chương trình khuyến mãi
            </p>
          </div>
        </div>

        {/* Product Category & Brand */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package size={20} className="text-purple-600" />
            <h3 className="font-bold text-gray-900">Danh mục & Thương hiệu</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Grid3x3 size={16} className="text-purple-600" />
                Danh mục sản phẩm
              </label>
              <select
                name="productCategory"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-purple-500 transition-all"
              >
                <option value="">Chọn danh mục</option>
                <option value="vf8">🚗 VinFast VF8</option>
                <option value="vf9">🚙 VinFast VF9</option>
                <option value="vfe34">🚕 VinFast VFe34</option>
                <option value="accessories">🔧 Phụ kiện</option>
                <option value="services">⚙️ Dịch vụ</option>
                <option value="insurance">🛡️ Bảo hiểm</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Award size={16} className="text-pink-600" />
                Thương hiệu áp dụng
              </label>
              <select
                name="applicableBrands"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-pink-500 transition-all"
              >
                <option value="">Chọn thương hiệu</option>
                <option value="vinfast">⚡ VinFast</option>
                <option value="accessories">✨ Phụ kiện chính hãng</option>
                <option value="partners">🤝 Đối tác</option>
              </select>
            </div>
          </div>
        </div>

        {/* Specific Products */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={20} className="text-green-600" />
            <h3 className="font-bold text-gray-900">Sản phẩm cụ thể</h3>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <Tag size={16} className="text-green-600" />
              Mã sản phẩm áp dụng
            </label>
            <textarea
              name="specificProducts"
              rows={3}
              placeholder="VD: VF8_PLUS, VF9_ECO, ACC_001 (phân tách bằng dấu phẩy)"
              className="p-4 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-green-500 transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              🏷️ Nhập mã sản phẩm, cách nhau bằng dấu phẩy
            </p>
          </div>
        </div>

        {/* Excluded Products */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <XCircle size={20} className="text-red-600" />
            <h3 className="font-bold text-gray-900">Sản phẩm loại trừ</h3>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <XCircle size={16} className="text-red-600" />
              Mã sản phẩm không áp dụng
            </label>
            <textarea
              name="excludedProducts"
              rows={3}
              placeholder="VD: VF8_BASE, VF9_LUXURY (các sản phẩm sẽ không được áp dụng khuyến mãi)"
              className="p-4 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-red-500 transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              ⛔ Liệt kê các sản phẩm không được hưởng khuyến mãi
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-blue-900 mb-1">
                Hướng dẫn cấu hình
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Nếu chọn Tất cả sản phẩm, không cần chọn danh mục cụ thể
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Sản phẩm loại trừ có độ ưu tiên cao hơn sản phẩm áp dụng
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Mã sản phẩm phải chính xác và tồn tại trong hệ thống
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
