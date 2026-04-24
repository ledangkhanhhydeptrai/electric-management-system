import React, { useState } from "react";
import {
  GiftOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TagOutlined,
  StarFilled
} from "@ant-design/icons";

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount?: string; // e.g., "20%", "$5,000"
  validUntil?: string; // ISO date string
  featured?: boolean;
  type?: "discount" | "gift" | "special";
  minPurchase?: string;
}

const PromotionCard: React.FC<{ promo: Promotion }> = ({ promo }) => {
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = () => {
    setIsApplied(true);
    setTimeout(() => setIsApplied(false), 2000);
  };

  const getTypeConfig = () => {
    switch (promo.type) {
      case "gift":
        return {
          gradient: "from-pink-500 to-rose-500",
          bgGradient: "from-pink-50 to-rose-50",
          icon: <GiftOutlined className="text-3xl" />,
          badge: "🎁 Quà tặng"
        };
      case "special":
        return {
          gradient: "from-purple-500 to-indigo-500",
          bgGradient: "from-purple-50 to-indigo-50",
          icon: <StarFilled className="text-3xl" />,
          badge: "⭐ Đặc biệt"
        };
      default:
        return {
          gradient: "from-green-500 to-emerald-500",
          bgGradient: "from-green-50 to-emerald-50",
          icon: <TagOutlined className="text-3xl" />,
          badge: "🏷️ Giảm giá"
        };
    }
  };

  const config = getTypeConfig();

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const isExpiringSoon = () => {
    if (!promo.validUntil) return false;
    const today = new Date();
    const validDate = new Date(promo.validUntil);
    const diffDays = Math.ceil((validDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  return (
    <div className="group relative">
      {/* Featured Badge */}
      {promo.featured && (
        <div className="absolute -top-3 -right-3 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm flex items-center gap-1 animate-pulse">
            <ThunderboltOutlined className="text-base" />
            HOT
          </div>
        </div>
      )}

      {/* Card Container */}
      <div
        className={`relative bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-green-300 hover:-translate-y-2 ${
          isApplied ? "ring-4 ring-green-400" : ""
        }`}
      >
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient}`}></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16"></div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 bg-gradient-to-br ${config.gradient} rounded-2xl text-white shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
              {config.icon}
            </div>
            
            {/* Type Badge */}
            <div className={`px-3 py-1.5 bg-gradient-to-r ${config.gradient} text-white text-xs font-bold rounded-full shadow-md`}>
              {config.badge}
            </div>
          </div>

          {/* Discount Display */}
          {promo.discount && (
            <div className="mb-4">
              <div className={`inline-flex items-baseline gap-2 px-4 py-2 bg-gradient-to-r ${config.gradient} rounded-xl shadow-lg`}>
                <span className="text-white text-4xl font-black">
                  {promo.discount}
                </span>
                <span className="text-white/90 text-lg font-semibold">OFF</span>
              </div>
            </div>
          )}

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
            {promo.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {promo.description}
          </p>

          {/* Additional Info */}
          <div className="space-y-2 mb-5">
            {promo.minPurchase && (
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <span>Đơn hàng tối thiểu: <strong>{promo.minPurchase}</strong></span>
              </div>
            )}
            
            {promo.validUntil && (
              <div className={`flex items-center gap-2 text-sm ${isExpiringSoon() ? "text-orange-600 font-semibold" : "text-gray-700"}`}>
                <ClockCircleOutlined className={isExpiringSoon() ? "text-orange-500" : "text-gray-500"} />
                <span>
                  {isExpiringSoon() ? "⚠️ Sắp hết hạn: " : "Có hiệu lực đến: "}
                  <strong>{formatDate(promo.validUntil)}</strong>
                </span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-5"></div>

          {/* Action Button */}
          <button
            onClick={handleApply}
            disabled={isApplied}
            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all duration-300 transform ${
              isApplied
                ? "bg-green-500 cursor-default"
                : `bg-gradient-to-r ${config.gradient} hover:shadow-xl hover:scale-[1.02] active:scale-95`
            }`}
          >
            {isApplied ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircleOutlined className="text-xl animate-bounce" />
                Đã áp dụng thành công!
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <TagOutlined className="text-lg" />
                Áp dụng ngay
              </span>
            )}
          </button>
        </div>

        {/* Hover Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </div>

        {/* Success Checkmark Animation */}
        {isApplied && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 backdrop-blur-sm rounded-2xl pointer-events-none">
            <div className="bg-white rounded-full p-4 shadow-2xl animate-scale">
              <CheckCircleOutlined className="text-green-500 text-6xl" />
            </div>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes scale {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scale {
          animation: scale 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PromotionCard;