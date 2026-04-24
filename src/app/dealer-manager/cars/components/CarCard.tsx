"use client";
import { Modal } from "antd";
import React from "react";
import {
  Battery,
  Users,
  Gauge,
  Settings,
  Palette,
  Eye,
  X,
  CheckCircle2,
  MapPin,
  Package
} from "lucide-react";
import { Car } from "@/app/evm/admin/cars/types";

const CarCard: React.FC<{ car: Car }> = ({ car }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const showModal = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const statusMap: Record<string, { label: string; color: string }> = {
    IN_FACTORY: { label: "Đang sản xuất", color: "bg-blue-500" },
    IN_TRANSIT: { label: "Đang vận chuyển", color: "bg-purple-500" },
    IN_STOCK: { label: "Trong kho", color: "bg-amber-500" },
    ALLOCATED: { label: "Đã phân bổ", color: "bg-cyan-600" },
    SOLD: { label: "Đã bán", color: "bg-gray-500" }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  return (
    <>
      {/* Card */}
      <div
        onClick={showModal}
        className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2"
      >
        {/* Image Container */}
        <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <div
              className={`${statusMap[car.status].color} px-4 py-2 rounded-full shadow-lg`}
            >
              <span className="text-xs font-bold text-white">
                {statusMap[car.status].label}
              </span>
            </div>
          </div>

          {/* Model Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-blue-600 px-3 py-1.5 rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">{car.modelName}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {car.vin}
          </h3>

          {/* Quick Specs */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Battery size={16} className="text-yellow-600" />
              <span>{car.batteryKwh} kWh</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} className="text-blue-600" />
              <span>{car.seat} chỗ</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={showModal}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 group"
          >
            <Eye size={18} />
            <span>Xem chi tiết</span>
          </button>
        </div>
      </div>

      {/* Enhanced Modal */}
      <Modal
        open={isOpen}
        onCancel={handleClose}
        footer={null}
        centered
        width={800}
        closeIcon={
          <div className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <X size={20} />
          </div>
        }
        className="car-detail-modal"
      >
        <div className="flex flex-col gap-6 -m-6">
          {/* Header Image */}
          <div className="relative w-full h-80 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-semibold border border-white/30">
                  {car.modelName}
                </span>
                <span
                  className={`${statusMap[car.status].color} text-white px-4 py-1.5 rounded-full text-sm font-bold`}
                >
                  {statusMap[car.status].label}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{car.vin}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-8">
            {/* Specifications Grid */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 mb-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="text-blue-600" size={20} />
                Thông Số Kỹ Thuật
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Battery */}
                <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Battery size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Dung lượng pin
                    </p>
                    <p className="font-bold text-gray-900">{car.batteryKwh} kWh</p>
                  </div>
                </div>

                {/* Range */}
                <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Gauge size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Quãng đường
                    </p>
                    <p className="font-bold text-gray-900">
                      {formatNumber(car.rangeKm)} km
                    </p>
                  </div>
                </div>

                {/* Seats */}
                <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Users size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Số chỗ ngồi
                    </p>
                    <p className="font-bold text-gray-900">{car.seat} chỗ</p>
                  </div>
                </div>

                {/* Color */}
                <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="bg-pink-100 p-2 rounded-lg">
                    <Palette size={20} className="text-pink-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Màu sắc
                    </p>
                    <p className="font-bold text-gray-900">{car.color}</p>
                  </div>
                </div>

                {/* Code */}
                <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Package size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Mã xe
                    </p>
                    <p className="font-bold text-gray-900">{car.code}</p>
                  </div>
                </div>

                {/* Manufacturer */}
                {car.manufacturerName && (
                  <div className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <MapPin size={20} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">
                        Nhà sản xuất
                      </p>
                      <p className="font-bold text-gray-900">
                        {car.manufacturerName}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-green-600" size={20} />
                Tính Năng Nổi Bật
              </h3>
              <div className="flex flex-wrap gap-2">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 px-4 py-2 rounded-full flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900">
                    Xe điện 100%
                  </span>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-4 py-2 rounded-full flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span className="text-sm font-semibold text-green-900">
                    Pin dung lượng cao
                  </span>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 px-4 py-2 rounded-full flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-purple-600" />
                  <span className="text-sm font-semibold text-purple-900">
                    Quãng đường xa
                  </span>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 px-4 py-2 rounded-full flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-orange-600" />
                  <span className="text-sm font-semibold text-orange-900">
                    Thiết kế hiện đại
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Mô Tả</h3>
              <p className="text-gray-700 leading-relaxed">
                {car.modelName} là dòng xe điện cao cấp với công nghệ hiện đại, pin
                dung lượng {car.batteryKwh} kWh cho phép di chuyển tới{" "}
                {formatNumber(car.rangeKm)} km. Xe được thiết kế với {car.seat} chỗ ngồi
                rộng rãi và thoải mái, đáp ứng mọi nhu cầu di chuyển của gia
                đình bạn.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        .car-detail-modal .ant-modal-content {
          padding: 0;
          overflow: hidden;
          border-radius: 1.5rem;
        }
        .car-detail-modal .ant-modal-close {
          top: 1rem;
          right: 1rem;
        }
      `}</style>
    </>
  );
};

export default CarCard;