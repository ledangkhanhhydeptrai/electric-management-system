// components/CarDetailModal.tsx
import React from "react";
import {
  X,
  Car as CarIcon,
  Battery,
  Gauge,
  Users,
  Shield,
  Calendar,
  Package,
  Palette
} from "lucide-react";
import Image from "next/image";
import { Car } from "../../cars/types";


interface CarDetailModalProps {
  carId: string;
  car?: Car;
  onClose: () => void;
}

export default function CarDetailModal({ car, onClose }: CarDetailModalProps) {
  if (!car) return null;

  const colorMap: { [key: string]: { bg: string; display: string } } = {
    WHITE: { bg: "#FFFFFF", display: "Trắng" },
    BLACK: { bg: "#000000", display: "Đen" },
    BLUE: { bg: "#3B82F6", display: "Xanh dương" },
    RED: { bg: "#EF4444", display: "Đỏ" },
    SILVER: { bg: "#C0C0C0", display: "Bạc" },
    GREY: { bg: "#6B7280", display: "Xám" },
    GREEN: { bg: "#10B981", display: "Xanh lá" },
    GOLDEN: { bg: "#F59E0B", display: "Vàng kim" }
  };

  const statusConfig: {
    [key: string]: { label: string; icon: string; gradient: string };
  } = {
    IN_FACTORY: {
      label: "Nhà máy",
      icon: "🏭",
      gradient: "from-blue-500 to-blue-600"
    },
    IN_TRANSIT: {
      label: "Vận chuyển",
      icon: "🚚",
      gradient: "from-amber-500 to-orange-600"
    },
    IN_STOCK: {
      label: "Trong kho",
      icon: "✅",
      gradient: "from-emerald-500 to-green-600"
    },
    ALLOCATED: {
      label: "Đã phân bổ",
      icon: "📦",
      gradient: "from-purple-500 to-pink-600"
    },
    SOLD: {
      label: "Đã bán",
      icon: "💰",
      gradient: "from-gray-500 to-gray-600"
    }
  };

  const statusInfo = statusConfig[car.status] || statusConfig.IN_STOCK;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-4 text-white">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <CarIcon className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Chi Tiết Xe</h2>
              <p className="text-emerald-100 text-sm">{car.vin}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image */}
          <div className="mb-6">
            <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
              {car.imageUrl ? (
                <Image
                  src={car.imageUrl}
                  alt={car.vin}
                  className="w-full h-full object-cover"
                  width={800}
                  height={400}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CarIcon className="w-20 h-20 text-gray-400" />
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-gradient-to-r ${statusInfo.gradient} text-white shadow-lg`}
                >
                  <span className="text-lg">{statusInfo.icon}</span>
                  {statusInfo.label}
                </span>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Info */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-600" />
                Thông tin cơ bản
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã xe:</span>
                  <span className="font-bold text-gray-900">{car.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Model:</span>
                  <span className="font-bold text-gray-900">
                    {car.modelName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phiên bản:</span>
                  <span className="font-bold text-gray-900">{car.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hãng:</span>
                  <span className="font-bold text-gray-900">
                    {car.manufacturerName}
                  </span>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-200">
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-cyan-600" />
                Thông số kỹ thuật
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Battery className="w-3.5 h-3.5 text-emerald-600" />
                    Pin:
                  </span>
                  <span className="font-bold text-gray-900">
                    {car.batteryKwh} kWh
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-teal-600" />
                    Quãng đường:
                  </span>
                  <span className="font-bold text-gray-900">
                    {car.rangeKm} km
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-cyan-600" />
                    Số ghế:
                  </span>
                  <span className="font-bold text-gray-900">
                    {car.seat} chỗ
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-indigo-600" />
                    Bảo hành:
                  </span>
                  <span className="font-bold text-gray-900">
                    {car.baseWarrantyMonths} tháng
                  </span>
                </div>
              </div>
            </div>

            {/* Color & Date */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-600" />
                Màu sắc
              </h3>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm"
                  style={{
                    backgroundColor: colorMap[car.color]?.bg || car.color
                  }}
                />
                <span className="font-bold text-gray-900 text-base">
                  {colorMap[car.color]?.display || car.color}
                </span>
              </div>
            </div>

            {/* Production Date */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-200">
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-pink-600" />
                Ngày sản xuất
              </h3>
              <div className="text-2xl font-bold text-gray-900">
                {formatDate(car.productionDate)}
              </div>
            </div>
          </div>

          {/* Dealer Info if available */}
          {car.dealerId && (
            <div className="mt-4 bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
              <h3 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                🏢 Đại lý
              </h3>
              <p className="text-sm text-gray-600">ID: {car.dealerId}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}