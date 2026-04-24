"use client";
import React, { useState } from "react";
import {
  Battery,
  Users,
  Gauge,
  CheckCircle2,
  Circle,
  Palette,
  X,
  Package
} from "lucide-react";

export interface CarCompare {
  id: string;
  vin: string;
  code: string;
  color: string;
  status: string;
  rangeKm: number;
  seat: number;
  batteryKwh: number;
  modelName: string;
  manufacturerName?: string | null;
}

interface Props {
  cars: CarCompare[];
  maxSelectable?: number;
}

const CarCompareTable: React.FC<Props> = ({ cars, maxSelectable = 3 }) => {
  const [selectedCars, setSelectedCars] = useState<string[]>([]);

  const toggleSelectCar = (id: string) => {
    if (selectedCars.includes(id)) {
      setSelectedCars(selectedCars.filter(c => c !== id));
    } else {
      if (selectedCars.length < maxSelectable) {
        setSelectedCars([...selectedCars, id]);
      }
    }
  };

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("vi-VN").format(num);

  const statusMap: Record<string, { label: string; color: string }> = {
    IN_FACTORY: { label: "Đang sản xuất", color: "bg-blue-500" },
    IN_TRANSIT: { label: "Đang vận chuyển", color: "bg-purple-500" },
    IN_STOCK: { label: "Trong kho", color: "bg-amber-500" },
    ALLOCATED: { label: "Đã phân bổ", color: "bg-cyan-600" },
    SOLD: { label: "Đã bán", color: "bg-gray-500" }
  };

  const getStatus = (status: string) =>
    statusMap[status] || { label: "Không xác định", color: "bg-gray-400" };

  const selectedCarData = cars.filter(car => selectedCars.includes(car.id));
  const bestBattery = Math.max(...selectedCarData.map(c => c.batteryKwh));
  const bestRange = Math.max(...selectedCarData.map(c => c.rangeKm));

  return (
    <div className="space-y-8">
      {/* Section 1: Danh sách tất cả xe để chọn */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl shadow-2xl p-8 border border-emerald-200/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Chọn xe để so sánh
            </h2>
            <p className="text-gray-600 mt-2">
              Chọn tối đa {maxSelectable} xe để xem so sánh chi tiết
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-3 border border-emerald-300/50 shadow-lg">
            <span className="text-lg font-bold text-emerald-700">
              Đã chọn: {selectedCars.length}/{maxSelectable}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map(car => {
            const isSelected = selectedCars.includes(car.id);
            const canSelect = selectedCars.length < maxSelectable || isSelected;

            return (
              <div
                key={car.id}
                onClick={() => canSelect && toggleSelectCar(car.id)}
                className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer group ${
                  isSelected
                    ? "border-emerald-500 shadow-2xl shadow-emerald-200 scale-105"
                    : canSelect
                    ? "border-gray-200 hover:border-emerald-300 hover:shadow-xl"
                    : "border-gray-200 opacity-50 cursor-not-allowed"
                }`}
              >
                {/* Check Icon */}
                <div className="absolute top-4 right-4">
                  {isSelected ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 animate-bounce" />
                  ) : (
                    <Circle className="w-8 h-8 text-gray-300 group-hover:text-emerald-400 transition-colors" />
                  )}
                </div>

                {/* Model Name */}
                <div className="mb-4">
                  <span className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    {car.modelName}
                  </span>
                </div>

                {/* VIN */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {car.vin}
                </h3>

                {/* Status */}
                <div className="mb-4">
                  <span
                    className={`${getStatus(car.status).color} text-white px-3 py-1.5 rounded-lg text-xs font-semibold inline-block shadow-md`}
                  >
                    {getStatus(car.status).label}
                  </span>
                </div>

                {/* Specs Grid */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Battery className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-medium">
                      {car.batteryKwh} kWh
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Gauge className="w-5 h-5 text-teal-600" />
                    <span className="text-sm font-medium">
                      {formatNumber(car.rangeKm)} km
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Users className="w-5 h-5 text-cyan-600" />
                    <span className="text-sm font-medium">{car.seat} chỗ</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Palette className="w-5 h-5 text-purple-600" />
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-full border-2 border-gray-300 shadow-sm"
                        style={{ backgroundColor: car.color }}
                      />
                      <span className="text-sm font-medium capitalize">
                        {car.color}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Bảng so sánh các xe đã chọn */}
      {selectedCars.length > 0 && (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 animate-fadeIn">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Package className="w-8 h-8" />
                Bảng so sánh chi tiết
              </h2>
              <button
                onClick={() => setSelectedCars([])}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <X className="w-5 h-5" />
                Xóa tất cả
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <th className="sticky left-0 z-10 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 text-left">
                    <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                      Thông số
                    </span>
                  </th>
                  {selectedCarData.map(car => (
                    <th
                      key={car.id}
                      className="px-6 py-5 text-center border-l border-gray-200 min-w-[200px]"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <button
                          onClick={() => toggleSelectCar(car.id)}
                          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors shadow-lg hover:shadow-xl"
                          title="Bỏ chọn xe này"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <span className="text-xl font-bold text-gray-900">
                          {car.vin}
                        </span>
                        <span className="text-xs font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 rounded-full shadow-md">
                          {car.modelName}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* VIN */}
                <tr className="hover:bg-emerald-50 transition-colors">
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 border-r border-gray-200 font-semibold text-gray-700">
                    VIN
                  </td>
                  {selectedCarData.map(car => (
                    <td
                      key={car.id}
                      className="px-6 py-4 text-center border-l border-gray-200 font-mono text-gray-900"
                    >
                      {car.vin}
                    </td>
                  ))}
                </tr>

                {/* Code */}
                <tr className="hover:bg-emerald-50 transition-colors">
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 border-r border-gray-200 font-semibold text-gray-700">
                    Mã xe
                  </td>
                  {selectedCarData.map(car => (
                    <td
                      key={car.id}
                      className="px-6 py-4 text-center border-l border-gray-200 font-mono text-gray-900"
                    >
                      {car.code}
                    </td>
                  ))}
                </tr>

                {/* Status */}
                <tr className="hover:bg-emerald-50 transition-colors">
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 border-r border-gray-200 font-semibold text-gray-700">
                    Trạng thái
                  </td>
                  {selectedCarData.map(car => (
                    <td
                      key={car.id}
                      className="px-6 py-4 text-center border-l border-gray-200"
                    >
                      <span
                        className={`${getStatus(car.status).color} text-white px-4 py-2 rounded-lg text-xs font-semibold inline-block shadow-md`}
                      >
                        {getStatus(car.status).label}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Battery */}
                <tr className="hover:bg-emerald-50 transition-colors">
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 border-r border-gray-200 font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <Battery className="w-5 h-5 text-emerald-600" />
                      Dung lượng pin
                    </div>
                  </td>
                  {selectedCarData.map(car => (
                    <td
                      key={car.id}
                      className={`px-6 py-4 text-center border-l border-gray-200 font-semibold ${
                        car.batteryKwh === bestBattery
                          ? "bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-900"
                          : "text-gray-900"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>{car.batteryKwh} kWh</span>
                        {car.batteryKwh === bestBattery && (
                          <span className="text-xl">🏆</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Range */}
                <tr className="hover:bg-emerald-50 transition-colors">
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 border-r border-gray-200 font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-5 h-5 text-teal-600" />
                      Quãng đường
                    </div>
                  </td>
                  {selectedCarData.map(car => (
                    <td
                      key={car.id}
                      className={`px-6 py-4 text-center border-l border-gray-200 font-semibold ${
                        car.rangeKm === bestRange
                          ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900"
                          : "text-gray-900"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>{formatNumber(car.rangeKm)} km</span>
                        {car.rangeKm === bestRange && (
                          <span className="text-xl">🏆</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Seats */}
                <tr className="hover:bg-emerald-50 transition-colors">
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 border-r border-gray-200 font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-cyan-600" />
                      Số chỗ ngồi
                    </div>
                  </td>
                  {selectedCarData.map(car => (
                    <td
                      key={car.id}
                      className="px-6 py-4 text-center border-l border-gray-200 text-gray-900 font-semibold"
                    >
                      {car.seat} chỗ
                    </td>
                  ))}
                </tr>

                {/* Color */}
                <tr className="hover:bg-emerald-50 transition-colors">
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 border-r border-gray-200 font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <Palette className="w-5 h-5 text-purple-600" />
                      Màu sắc
                    </div>
                  </td>
                  {selectedCarData.map(car => (
                    <td
                      key={car.id}
                      className="px-6 py-4 text-center border-l border-gray-200"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-md"
                          style={{ backgroundColor: car.color }}
                        />
                        <span className="font-semibold text-gray-700 capitalize">
                          {car.color}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CarCompareTable;