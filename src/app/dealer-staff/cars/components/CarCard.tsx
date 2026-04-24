"use client";
import React, { useState } from "react";
import { Modal } from "antd";
import {
  CarOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  BgColorsOutlined,
  FireOutlined
} from "@ant-design/icons";
import { Car } from "@/app/evm/admin/cars/types";
import { Battery, Gauge, Users, Shield, Zap } from "lucide-react";

const CarCard: React.FC<{ car: Car }> = ({ car }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  const statusMap: Record<
    string,
    { label: string; color: string; gradient: string; icon: string }
  > = {
    IN_FACTORY: {
      label: "Đang sản xuất",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
      icon: "🏭"
    },
    IN_TRANSIT: {
      label: "Đang vận chuyển",
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
      icon: "🚚"
    },
    IN_STOCK: {
      label: "Sẵn sàng",
      color: "bg-emerald-500",
      gradient: "from-emerald-500 to-green-600",
      icon: "✅"
    },
    ALLOCATED: {
      label: "Đã phân bổ",
      color: "bg-cyan-600",
      gradient: "from-cyan-500 to-teal-600",
      icon: "📦"
    },
    SOLD: {
      label: "Đã bán",
      color: "bg-gray-500",
      gradient: "from-gray-500 to-gray-600",
      icon: "🔒"
    }
  };

  const getStatus = () => {
    return (
      statusMap[car.status] || {
        label: "Không xác định",
        color: "bg-gray-400",
        gradient: "from-gray-400 to-gray-500",
        icon: "❓"
      }
    );
  };

  const colorTranslations: Record<string, string> = {
    WHITE: "Trắng",
    BLACK: "Đen",
    BLUE: "Xanh dương",
    RED: "Đỏ",
    SILVER: "Bạc",
    GREY: "Xám",
    GREEN: "Xanh lá",
    GOLDEN: "Vàng kim"
  };

  return (
    <>
      {/* Ultra Premium Card Design */}
      <div
        className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 cursor-pointer border-2 border-transparent hover:border-emerald-300 flex flex-col transform hover:-translate-y-2"
        onClick={showModal}
      >
        {/* Status */}
        <div className="absolute top-5 right-5 z-20">
          <div
            className={`flex items-center gap-2 bg-gradient-to-r ${
              getStatus().gradient
            } text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-sm transform hover:scale-110 transition-all duration-300 border border-white/30`}
          >
            <span className="text-lg">{getStatus().icon}</span>
            <span className="text-sm font-bold tracking-wide">
              {getStatus().label}
            </span>
          </div>
        </div>

        {/* Electric Badge */}
        <div className="absolute top-5 left-5 z-20">
          <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/30 backdrop-blur-sm">
            <Zap className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-black tracking-wider">ECO</span>
          </div>
        </div>

        {/* Visual */}
        <div className="relative h-80 bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 overflow-hidden">
          <div className="absolute top-10 left-10 w-28 h-28 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-36 h-36 bg-green-400/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <CarOutlined
              className="text-emerald-600/40"
              style={{ fontSize: "200px" }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col relative bg-white">
          {/* VIN & Model */}
          <div className="mb-4">
            <div className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-4 border-2 border-emerald-200 shadow-lg overflow-hidden">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl shadow-lg">
                  <CarOutlined className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-xs text-emerald-700 font-semibold uppercase">
                    Mã VIN
                  </p>
                  <h3 className="text-lg font-black text-gray-900">
                    {car.vin}
                  </h3>
                </div>
              </div>
              <p className="text-sm font-black text-emerald-700 uppercase">
                {car.modelName}
              </p>
            </div>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex flex-col items-center bg-amber-50 border-2 border-amber-200 rounded-2xl p-3">
              <Battery className="w-5 h-5 text-amber-800 mb-1" />
              <span className="font-black text-amber-800">
                {car.batteryKwh} kWh
              </span>
            </div>
            <div className="flex flex-col items-center bg-purple-50 border-2 border-purple-200 rounded-2xl p-3">
              <Gauge className="w-5 h-5 text-purple-800 mb-1" />
              <span className="font-black text-purple-800">
                {formatNumber(car.rangeKm)} km
              </span>
            </div>
            <div className="flex flex-col items-center bg-blue-50 border-2 border-blue-200 rounded-2xl p-3">
              <Users className="w-5 h-5 text-blue-800 mb-1" />
              <span className="font-black text-blue-800">{car.seat} chỗ</span>
            </div>
          </div>

          {/* Color */}
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border border-gray-200 mb-4">
            <BgColorsOutlined className="text-lg text-gray-700" />
            <span className="font-bold text-gray-900">
              {colorTranslations[car.color] || car.color}
            </span>
          </div>

          {/* Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showModal();
            }}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 text-white font-black rounded-2xl shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500"
          >
            Xem Chi Tiết
          </button>
        </div>
      </div>

      {/* Modal - Keep existing modal code */}
      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        width={850} // 1000 → 850
        closeIcon={null}
        className="custom-modal"
        style={{ top: 1 }}
      >
        <div className="relative -m-6">
          {/* Custom Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 p-2.5 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-xl transition-all duration-300 hover:rotate-90 hover:scale-110 shadow-xl border border-white/30"
          >
            <CloseOutlined className="text-lg" />
          </button>

          {/* Modal Header - Compact */}
          <div className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 px-6 py-6 overflow-hidden">
            {/* Decorative elements - smaller */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              {/* Title Section - Compact */}
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-xl border border-white/30">
                  <CarOutlined className="text-white text-2xl" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                    {car.vin}
                  </h2>
                  <p className="text-emerald-100 font-semibold text-sm flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></span>
                    {car.modelName}
                  </p>
                </div>
              </div>

              {/* Badges - Compact */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 rounded-xl border border-white/30">
                  <Zap className="text-yellow-300 w-4 h-4" />
                  <span className="text-white font-bold text-xs tracking-wide">
                    100% ĐIỆN
                  </span>
                </div>
                <div
                  className={`flex items-center gap-2 bg-gradient-to-r ${
                    getStatus().gradient
                  } px-3 py-2 rounded-xl shadow-xl border border-white/30`}
                >
                  <span className="text-sm">{getStatus().icon}</span>
                  <span className="text-white font-bold text-xs tracking-wide">
                    {getStatus().label.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Content - Compact */}
          <div className="p-6 space-y-5 bg-gradient-to-br from-gray-50 via-white to-emerald-50/20">
            {/* Hero Visual - Smaller */}
            <div className="relative bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 rounded-2xl overflow-hidden shadow-lg border border-emerald-200 p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.2),transparent_70%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(5,150,105,0.15),transparent_70%)]"></div>

              <div className="relative flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full"></div>
                  <CarOutlined
                    className="relative text-emerald-600/40"
                    style={{ fontSize: "140px" }} // 240px → 140px
                  />
                </div>
              </div>
            </div>

            {/* Technical Specs - Compact Grid */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl shadow-lg">
                  <FireOutlined className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-black text-gray-900">
                  Thông Số Kỹ Thuật
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Battery */}
                <div className="group/spec bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover/spec:rotate-12 transition-transform duration-300">
                      <Battery className="text-white w-6 h-6" />
                    </div>
                    <div className="text-amber-800 font-black text-lg mb-1">
                      {car.batteryKwh}
                    </div>
                    <div className="text-xs text-amber-700 font-semibold">
                      kWh
                    </div>
                  </div>
                </div>

                {/* Range */}
                <div className="group/spec bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-4 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover/spec:rotate-12 transition-transform duration-300">
                      <Gauge className="text-white w-6 h-6" />
                    </div>
                    <div className="text-purple-800 font-black text-lg mb-1">
                      {formatNumber(car.rangeKm)}
                    </div>
                    <div className="text-xs text-purple-700 font-semibold">
                      km
                    </div>
                  </div>
                </div>

                {/* Seats */}
                <div className="group/spec bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-4 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover/spec:rotate-12 transition-transform duration-300">
                      <Users className="text-white w-6 h-6" />
                    </div>
                    <div className="text-blue-800 font-black text-lg mb-1">
                      {car.seat}
                    </div>
                    <div className="text-xs text-blue-700 font-semibold">
                      chỗ
                    </div>
                  </div>
                </div>

                {/* Color */}
                <div className="group/spec bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 rounded-2xl p-4 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center shadow-lg group-hover/spec:rotate-12 transition-transform duration-300">
                      <BgColorsOutlined className="text-white text-2xl" />
                    </div>
                    <div className="text-pink-800 font-black text-lg mb-1 capitalize">
                      {colorTranslations[car.color] || car.color}
                    </div>
                    <div className="text-xs text-pink-700 font-semibold">
                      Màu sắc
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Info - Compact */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 border border-gray-200 shadow-md">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-600 to-green-600 rounded-full"></div>
                <h3 className="text-lg font-black text-gray-900">
                  Thông Tin Xe
                </h3>
              </div>

              {/* Grid thông tin */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Mã xe */}
                <div className="bg-white rounded-xl p-4 border border-gray-100 hover:border-emerald-200 transition-all">
                  <div className="flex items-center gap-1.5 mb-1 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span>
                    Mã xe
                  </div>
                  <p className="font-black text-gray-900 text-base">
                    {car.code}
                  </p>
                </div>

                {/* Model */}
                <div className="bg-white rounded-xl p-4 border border-gray-100 hover:border-emerald-200 transition-all">
                  <div className="flex items-center gap-1.5 mb-1 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span>
                    Model
                  </div>
                  <p className="font-black text-gray-900 text-base">
                    {car.modelName}
                  </p>
                </div>

                {/* Nhà sản xuất */}
                {car.manufacturerName && (
                  <div className="md:col-span-2 bg-white rounded-xl p-4 border border-gray-100 hover:border-emerald-200 transition-all">
                    <div className="flex items-center gap-1.5 mb-1 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span>
                      Nhà sản xuất
                    </div>
                    <p className="font-black text-gray-900 text-base">
                      {car.manufacturerName}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Features - Compact */}
            <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-5 border border-emerald-200 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                  <Shield className="text-white w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-gray-900">
                  Điểm Nổi Bật
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {[
                  {
                    icon: <Zap className="w-4 h-4" />,
                    text: "100% thân thiện môi trường",
                    color: "from-emerald-500 to-green-600"
                  },
                  {
                    icon: <Battery className="w-4 h-4" />,
                    text: "Pin dung lượng cao",
                    color: "from-amber-500 to-orange-600"
                  },
                  {
                    icon: <Gauge className="w-4 h-4" />,
                    text: "Sạc nhanh 30 phút",
                    color: "from-purple-500 to-pink-600"
                  },
                  {
                    icon: <Shield className="w-4 h-4" />,
                    text: "An toàn 5 sao",
                    color: "from-blue-500 to-cyan-600"
                  },
                  {
                    icon: <CheckCircleOutlined />,
                    text: "Công nghệ AI",
                    color: "from-indigo-500 to-purple-600"
                  },
                  {
                    icon: <CheckCircleOutlined />,
                    text: "Bảo hành 10 năm",
                    color: "from-teal-500 to-emerald-600"
                  }
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white rounded-xl p-3 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border border-emerald-100 hover:border-emerald-200 group/feature"
                  >
                    <div
                      className={`w-9 h-9 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover/feature:scale-110 transition-transform duration-200`}
                    >
                      <span className="text-white text-sm">{feature.icon}</span>
                    </div>
                    <span className="text-gray-800 font-semibold text-xs flex-1">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Enhanced Styles */}
      <style jsx global>{`
        .custom-modal .ant-modal-content {
          padding: 10px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
        }

        .custom-modal .ant-modal-close {
          display: none;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default CarCard;
