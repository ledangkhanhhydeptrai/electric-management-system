import React from "react";
import {
  Megaphone,
  Radio,
  Image as ImageIcon,
  MessageSquare,
  Search,
  ExternalLink,
  Info,
  CheckCircle2,
  Globe,
  Smartphone,
  Mail,
  MessageCircle,
  Share2,
  Newspaper
} from "lucide-react";

export default function FormMarketing() {
  const channels = [
    { name: "Website", value: "website", icon: <Globe size={16} /> },
    { name: "Mobile App", value: "mobile_app", icon: <Smartphone size={16} /> },
    { name: "Email", value: "email", icon: <Mail size={16} /> },
    { name: "SMS", value: "sms", icon: <MessageCircle size={16} /> },
    { name: "Social Media", value: "social_media", icon: <Share2 size={16} /> },
    { name: "Print Media", value: "print_media", icon: <Newspaper size={16} /> }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
            <Megaphone size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Marketing & Truyền thông
          </h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Marketing Channels */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Radio size={20} className="text-purple-600" />
            <h3 className="font-bold text-gray-900">Kênh truyền thông</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {channels.map((channel) => (
              <label
                key={channel.value}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-all group"
              >
                <input
                  type="checkbox"
                  name="marketingChannels"
                  value={channel.value}
                  className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                />
                <div className="flex items-center gap-2 flex-1">
                  <div className="text-purple-600 group-hover:scale-110 transition-transform">
                    {channel.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {channel.name}
                  </span>
                </div>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            📢 Chọn các kênh để quảng bá chương trình khuyến mãi
          </p>
        </div>

        {/* Banner & Media */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon size={20} className="text-blue-600" />
            <h3 className="font-bold text-gray-900">Banner & Media</h3>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <ImageIcon size={16} className="text-blue-600" />
              Banner/Hình ảnh URL
            </label>
            <input
              type="url"
              name="bannerUrl"
              placeholder="https://example.com/banner.jpg"
              className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-blue-500 transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">
              🖼️ Link hình ảnh banner cho chiến dịch marketing
            </p>
          </div>
        </div>

        {/* Marketing Message */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare size={20} className="text-green-600" />
            <h3 className="font-bold text-gray-900">Thông điệp Marketing</h3>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <MessageSquare size={16} className="text-green-600" />
              Nội dung thông điệp
            </label>
            <textarea
              name="marketingMessage"
              rows={4}
              placeholder="VD: Ưu đãi đặc biệt - Giảm ngay 15% cho tất cả xe VinFast! Số lượng có hạn, nhanh tay đặt hàng!"
              className="p-4 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-green-500 transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              💬 Thông điệp chính để thu hút khách hàng
            </p>
          </div>
        </div>

        {/* SEO & Landing Page */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Search size={20} className="text-orange-600" />
            <h3 className="font-bold text-gray-900">SEO & Landing Page</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Search size={16} className="text-orange-600" />
                Từ khóa SEO
              </label>
              <input
                type="text"
                name="seoKeywords"
                placeholder="VD: khuyến mãi, giảm giá, vinfast, ưu đãi"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-orange-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                🔍 Từ khóa để tối ưu SEO (phân tách bằng dấu phẩy)
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <ExternalLink size={16} className="text-orange-600" />
                URL Landing Page
              </label>
              <input
                type="url"
                name="landingPageUrl"
                placeholder="https://example.com/promo"
                className="p-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:border-orange-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">
                🔗 Trang đích cho chiến dịch marketing
              </p>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-pink-50 border-l-4 border-pink-600 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-pink-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-pink-900 mb-1">
                Tips Marketing hiệu quả
              </p>
              <ul className="text-sm text-pink-800 space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Sử dụng nhiều kênh để tối đa hóa охват khách hàng</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Thông điệp ngắn gọn, súc tích và có call-to-action rõ ràng
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    Banner chất lượng cao, kích thước phù hợp với từng kênh
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Tối ưu SEO để tăng khả năng tìm kiếm tự nhiên</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
