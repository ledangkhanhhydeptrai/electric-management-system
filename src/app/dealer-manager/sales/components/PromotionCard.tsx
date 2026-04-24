"use client";
import React from "react";
import {
  Percent,
  Calendar,
  Sparkles,
  Gift,
  ArrowRight,
  Edit2,
  Trash2
} from "lucide-react";

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
}

const PromotionCard: React.FC<Promotion> = ({
  title,
  description,
  discount
}) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Ribbon Badge */}
      <div className="absolute -right-10 top-6 rotate-45 bg-gradient-to-r from-orange-500 to-red-500 px-12 py-1 shadow-lg">
        <span className="text-white text-xs font-bold">HOT</span>
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Icon Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl shadow-md">
            <Gift size={24} className="text-white" />
          </div>
          <div className="flex items-center gap-1">
            <Sparkles size={16} className="text-yellow-500" />
            <span className="text-xs font-semibold text-orange-600">
              Ưu đãi đặc biệt
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {description}
        </p>

        {/* Discount Badge */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-3 rounded-xl shadow-lg">
            <Percent size={20} />
            <span className="text-2xl font-bold">{discount}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-4"></div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between">
          {/* Validity Info */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar size={14} />
            <span>Có hiệu lực</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors group/edit"
              title="Chỉnh sửa"
            >
              <Edit2
                size={16}
                className="text-gray-400 group-hover/edit:text-blue-600 transition-colors"
              />
            </button>
            <button
              className="p-2 hover:bg-red-50 rounded-lg transition-colors group/delete"
              title="Xóa"
            >
              <Trash2
                size={16}
                className="text-gray-400 group-hover/delete:text-red-600 transition-colors"
              />
            </button>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 group/cta">
          <span>Xem chi tiết</span>
          <ArrowRight
            size={18}
            className="group-hover/cta:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* Floating Elements */}
      <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
      <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
    </div>
  );
};

export default PromotionCard;