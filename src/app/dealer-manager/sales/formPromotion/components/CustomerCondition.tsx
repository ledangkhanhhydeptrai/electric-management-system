import React from "react";
import {
  Users,
  UserCheck,
  MapPin,
  Calendar,
  User,
  Award,
  Target,
  Globe
} from "lucide-react";

export default function CustomerCondition() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <Users size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Điều kiện khách hàng
          </h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Customer Type & Membership */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award size={20} className="text-purple-600" />
            <h3 className="font-bold text-gray-900">Phân loại khách hàng</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <UserCheck size={16} className="text-purple-600" />
                Loại khách hàng
              </label>
              <select
                name="customerType"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-purple-500 transition-all"
              >
                <option value="">Tất cả khách hàng</option>
                <option value="new">Khách hàng mới</option>
                <option value="existing">Khách hàng cũ</option>
                <option value="vip">Khách hàng VIP</option>
                <option value="premium">Khách hàng Premium</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Award size={16} className="text-pink-600" />
                Hạng thành viên
              </label>
              <select
                name="membershipTier"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-pink-500 transition-all"
              >
                <option value="">Tất cả hạng</option>
                <option value="bronze">🥉 Đồng</option>
                <option value="silver">🥈 Bạc</option>
                <option value="gold">🥇 Vàng</option>
                <option value="platinum">💎 Bạch kim</option>
                <option value="diamond">💍 Kim cương</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={20} className="text-blue-600" />
            <h3 className="font-bold text-gray-900">Khu vực áp dụng</h3>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <MapPin size={16} className="text-blue-600" />
              Chọn khu vực
            </label>
            <select
              name="region"
              className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-blue-500 transition-all"
            >
              <option value="">🌏 Toàn quốc</option>
              <option value="north">⬆️ Miền Bắc</option>
              <option value="central">➡️ Miền Trung</option>
              <option value="south">⬇️ Miền Nam</option>
              <option value="hcm">🏙️ TP. Hồ Chí Minh</option>
              <option value="hanoi">🏛️ Hà Nội</option>
              <option value="danang">🏖️ Đà Nẵng</option>
            </select>
          </div>
        </div>

        {/* Demographics */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target size={20} className="text-green-600" />
            <h3 className="font-bold text-gray-900">Thông tin nhân khẩu</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Calendar size={16} className="text-green-600" />
                Tuổi tối thiểu
              </label>
              <input
                type="number"
                name="minAge"
                placeholder="VD: 18"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-green-500 transition-all"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Calendar size={16} className="text-green-600" />
                Tuổi tối đa
              </label>
              <input
                type="number"
                name="maxAge"
                placeholder="VD: 65"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-green-500 transition-all"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <User size={16} className="text-green-600" />
                Giới tính
              </label>
              <select
                name="gender"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-green-500 transition-all"
              >
                <option value="">Tất cả</option>
                <option value="male">👨 Nam</option>
                <option value="female">👩 Nữ</option>
                <option value="other">🧑 Khác</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Info */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-orange-500 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Target
              size={20}
              className="text-orange-600 flex-shrink-0 mt-0.5"
            />
            <div>
              <p className="text-sm font-bold text-orange-900 mb-1">
                Đối tượng mục tiêu
              </p>
              <p className="text-sm text-orange-800">
                Khuyến mãi sẽ áp dụng cho khách hàng thỏa mãn các điều kiện đã
                chọn ở trên. Để lại trống nếu không giới hạn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
