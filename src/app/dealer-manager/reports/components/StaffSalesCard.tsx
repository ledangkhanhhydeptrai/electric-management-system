"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import {
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Calendar,
  FileText,
  Award,
  X,
  History,
  Target
} from "lucide-react";

interface Props {
  staffName: string;
  orders: number;
  totalRevenue: number;
  notes?: string;
  salesHistory?: { date: string; orderCount: number; revenue: number }[];
  target?: number;
  rating?: number;
}

// Component format giá tiền trên client
const FormattedPrice: React.FC<{ value: number }> = ({ value }) => {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    setFormatted(value.toLocaleString("vi-VN"));
  }, [value]);

  return <span>{formatted}</span>;
};

const StaffSalesCard: React.FC<Props> = ({
  staffName,
  orders,
  totalRevenue,
  notes,
  salesHistory,
  target,
  rating
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate performance
  const avgOrderValue = totalRevenue / orders;
  const targetProgress = target ? (totalRevenue / target) * 100 : 0;
  const performanceLevel =
    targetProgress >= 100
      ? "excellent"
      : targetProgress >= 80
      ? "good"
      : targetProgress >= 60
      ? "average"
      : "low";

  const performanceConfig = {
    excellent: {
      color: "text-green-600",
      bg: "from-green-50 to-emerald-50",
      border: "border-green-200"
    },
    good: {
      color: "text-blue-600",
      bg: "from-blue-50 to-indigo-50",
      border: "border-blue-200"
    },
    average: {
      color: "text-orange-600",
      bg: "from-orange-50 to-amber-50",
      border: "border-orange-200"
    },
    low: {
      color: "text-red-600",
      bg: "from-red-50 to-pink-50",
      border: "border-red-200"
    }
  };

  const config = performanceConfig[performanceLevel];

  return (
    <>
      {/* Card Preview */}
      <div
        onClick={() => setIsOpen(true)}
        className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2"
      >
        {/* Header with Gradient */}
        <div
          className={`h-20 bg-gradient-to-r ${config.bg} p-4 border-b ${config.border} relative`}
        >
          {rating && (
            <div className="absolute top-3 right-3">
              <div className="bg-yellow-500 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
                <Award size={14} className="text-white fill-current" />
                <span className="text-xs font-bold text-white">
                  {rating}/5 ⭐
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="relative px-6 -mt-10 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl border-4 border-white">
            {staffName.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Staff Name */}
          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {staffName}
          </h3>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <ShoppingCart size={14} className="text-blue-600" />
                <p className="text-xs text-gray-600">Đơn hàng</p>
              </div>
              <p className="text-xl font-bold text-blue-600">{orders}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl border border-green-100">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign size={14} className="text-green-600" />
                <p className="text-xs text-gray-600">Doanh thu</p>
              </div>
              <p className="text-lg font-bold text-green-600">
                {(totalRevenue / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>

          {/* Target Progress */}
          {target && (
            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Mục tiêu</span>
                <span className={`text-xs font-bold ${config.color}`}>
                  {targetProgress.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${config.bg
                    .replace("from-", "from-")
                    .replace("to-", "to-")
                    .replace(
                      "-50",
                      "-500"
                    )} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(targetProgress, 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modal */}
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        centered
        width={800}
        closeIcon={
          <div className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <X size={20} />
          </div>
        }
        className="staff-detail-modal"
      >
        <div className="flex flex-col gap-6 -m-6">
          {/* Modal Header */}
          <div className="relative h-28 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white font-bold text-xl border-2 border-white/30 shadow-lg">
                  {staffName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    {staffName}
                  </h2>
                  <p className="text-blue-100 text-sm">Chi tiết hiệu suất</p>
                </div>
              </div>
              {rating && (
                <div className="bg-yellow-500 px-4 py-2 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-white fill-current" />
                    <span className="text-sm font-bold text-white">
                      {rating}/5 ⭐
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal Content */}
          <div className="px-8 pb-8 space-y-6">
            {/* Performance Overview */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} className="text-blue-600" />
                <h3 className="font-bold text-gray-900">Tổng quan hiệu suất</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <ShoppingCart size={16} className="text-blue-600" />
                    <p className="text-xs text-gray-500">Tổng đơn hàng</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{orders}</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign size={16} className="text-green-600" />
                    <p className="text-xs text-gray-500">Tổng doanh thu</p>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    <FormattedPrice value={totalRevenue} /> ₫
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp size={16} className="text-purple-600" />
                    <p className="text-xs text-gray-500">TB/Đơn hàng</p>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">
                    {(avgOrderValue / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>
            </div>

            {/* Target Progress */}
            {target && (
              <div
                className={`bg-gradient-to-br ${config.bg} border ${config.border} rounded-2xl p-6`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Target
                    size={20}
                    className={config.color.replace("text-", "text-")}
                  />
                  <h3 className="font-bold text-gray-900">Tiến độ mục tiêu</h3>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm text-gray-600">
                        Mục tiêu tháng này
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        <FormattedPrice value={target} /> ₫
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Đã đạt</p>
                      <p className={`text-2xl font-bold ${config.color}`}>
                        {targetProgress.toFixed(0)}%
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`bg-gradient-to-r ${config.bg.replace(
                        "-50",
                        "-500"
                      )} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(targetProgress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Còn thiếu:{" "}
                    <FormattedPrice
                      value={Math.max(0, target - totalRevenue)}
                    />{" "}
                    ₫
                  </p>
                </div>
              </div>
            )}

            {/* Notes */}
            {notes && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={20} className="text-purple-600" />
                  <h3 className="font-bold text-gray-900">Ghi chú</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{notes}</p>
              </div>
            )}

            {/* Sales History */}
            {salesHistory && salesHistory.length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <History size={20} className="text-green-600" />
                  <h3 className="font-bold text-gray-900">
                    Lịch sử bán hàng ({salesHistory.length})
                  </h3>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {salesHistory.map((sale, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-4 shadow-sm border border-green-100 hover:border-green-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                            {idx + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar size={14} className="text-green-600" />
                              <span className="text-sm font-semibold text-gray-900">
                                {sale.date}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <ShoppingCart size={12} />
                              <span>{sale.orderCount} đơn hàng</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-1">
                            Doanh thu
                          </p>
                          <p className="font-bold text-green-600">
                            <FormattedPrice value={sale.revenue} /> ₫
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
            >
              Đóng
            </button>
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        .staff-detail-modal .ant-modal-content {
          padding: 0;
          overflow: hidden;
          border-radius: 1.5rem;
        }
        .staff-detail-modal .ant-modal-close {
          top: 1rem;
          right: 1rem;
        }
      `}</style>
    </>
  );
};

export default StaffSalesCard;
