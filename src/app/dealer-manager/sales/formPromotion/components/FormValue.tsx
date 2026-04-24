import React from "react";
import {
  Percent,
  DollarSign,
  Gift,
  Package,
  Tag,
  ShoppingCart,
  Users,
  TrendingUp,
  Info,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function FormValue() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <Gift size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Loại khuyến mãi & Giá trị
          </h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Promo Type & Value */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Tag size={20} className="text-blue-600" />
            <h3 className="font-bold text-gray-900">
              Loại & Giá trị khuyến mãi
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Package size={16} className="text-blue-600" />
                Loại khuyến mãi <span className="text-red-500">*</span>
              </label>
              <select
                name="promoType"
                required
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="">Chọn loại</option>
                <option value="percentage">📊 Giảm theo phần trăm (%)</option>
                <option value="fixed">💵 Giảm số tiền cố định</option>
                <option value="buy_x_get_y">🎁 Mua X tặng Y</option>
                <option value="free_shipping">🚚 Miễn phí vận chuyển</option>
                <option value="gift">🎀 Quà tặng kèm</option>
                <option value="bundle">📦 Combo đặc biệt</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                📌 Chọn hình thức khuyến mãi
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign size={16} className="text-indigo-600" />
                Giá trị khuyến mãi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="promoValue"
                placeholder="VD: 15% hoặc 500000"
                required
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-indigo-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                💰 Nhập giá trị (% hoặc số tiền)
              </p>
            </div>
          </div>
        </div>

        {/* Order Limits */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart size={20} className="text-orange-600" />
            <h3 className="font-bold text-gray-900">Giới hạn đơn hàng</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <TrendingUp size={16} className="text-orange-600" />
                Giá trị tối đa (VNĐ)
              </label>
              <input
                type="number"
                name="maxDiscount"
                placeholder="VD: 2000000"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-orange-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                📈 Số tiền giảm tối đa cho mỗi đơn
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <ShoppingCart size={16} className="text-red-600" />
                Đơn hàng tối thiểu (VNĐ)
              </label>
              <input
                type="number"
                name="minOrderValue"
                placeholder="VD: 1000000"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-red-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                🛒 Giá trị đơn tối thiểu để áp dụng
              </p>
            </div>
          </div>
        </div>

        {/* Usage Limits */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-purple-600" />
            <h3 className="font-bold text-gray-900">Giới hạn sử dụng</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Tag size={16} className="text-purple-600" />
                Số lần sử dụng tối đa
              </label>
              <input
                type="number"
                name="maxUsage"
                placeholder="VD: 1000"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-purple-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                🎫 Tổng số lần mã có thể được sử dụng
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Users size={16} className="text-pink-600" />
                Số lần/khách hàng
              </label>
              <input
                type="number"
                name="maxUsagePerCustomer"
                placeholder="VD: 1"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-pink-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                👤 Mỗi khách hàng được dùng bao nhiêu lần
              </p>
            </div>
          </div>
        </div>

        {/* Value Calculator Preview */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Percent size={20} className="text-green-600" />
            <h3 className="font-bold text-gray-900">Ước tính giá trị</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign size={16} className="text-green-600" />
                <p className="text-xs font-bold text-gray-600">
                  Giá trị trung bình/đơn
                </p>
              </div>
              <p className="text-lg font-bold text-gray-900">Tính sau</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-green-600" />
                <p className="text-xs font-bold text-gray-600">
                  Tổng giá trị tối đa
                </p>
              </div>
              <p className="text-lg font-bold text-gray-900">Tính sau</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <Users size={16} className="text-green-600" />
                <p className="text-xs font-bold text-gray-600">
                  Khách hàng dự kiến
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
                Hướng dẫn cấu hình giá trị
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Giảm theo % thì nhập số (VD: 15 = 15%), giảm cố định nhập số
                    tiền
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Giá trị tối đa giúp kiểm soát ngân sách khi giảm theo %
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Đơn tối thiểu khuyến khích khách hàng mua nhiều hơn
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Giới hạn sử dụng giúp tránh lạm dụng và kiểm soát chi phí
                  </span>
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
                ⚠️ Cảnh báo quan trọng
              </p>
              <p className="text-sm text-yellow-800">
                Kiểm tra kỹ giá trị khuyến mãi trước khi lưu. Sau khi kích hoạt,
                một số thông tin có thể không được chỉnh sửa để đảm bảo tính
                công bằng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
