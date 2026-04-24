import React, { useState } from "react";
import {
  Car as CarIcon,
  Search,
  Edit2,
  Trash2,
  Filter,
  X,
  Battery,
  Gauge,
  Users,
  Package,
  Palette,
  ChevronLeft,
  ChevronRight,
  ImageIcon
} from "lucide-react";
import { Car } from "../types";
import { ColorEnum } from "@/services/vehicle/vehicle";
import { Dealer } from "../../dealerView/types/types";
import { Enum, Models } from "@/services/vehicleModel/vehicle";
import Image from "next/image";

interface CarTableProps {
  cars: Car[];
  tempFilterMinRangeKm: number;
  setTempFilterMinRangeKm: (value: number) => void;
  onClick: (id: string) => void;
  onRowClick: (id: string) => void;
  onDelete: (id: string) => void;
  filterModelId: string;
  setFilterModelId: (value: string) => void;
  filterVersion: Enum;
  setFilterVersion: (value: Enum) => void;
  filterColor: ColorEnum;
  setFilterColor: (value: ColorEnum) => void;
  filterVinContains: string;
  setFilterVinContains: (value: string) => void;
  filterMinRangeKm: number;
  setFilterMinRangeKm: (value: number) => void;
  filterDealerId: string;
  setFilterDealerId: (value: string) => void;
  filterManufacturerName: string;
  setFilterManufacturerName: (value: string) => void;
  dealer: Dealer[];
  model: Models[];
  onSearchFilter: () => void;
  tempFilterStatus: string;
  setTempFilterStatus: (value: string) => void;
}

export default function CarTable({
  cars,
  onClick,
  onRowClick,
  onDelete,
  filterModelId,
  setFilterModelId,
  filterColor,
  setFilterColor,
  filterVinContains,
  setFilterVinContains,
  tempFilterMinRangeKm,
  setTempFilterMinRangeKm,
  filterDealerId,
  setFilterDealerId,
  model,
  dealer,
  onSearchFilter,
  tempFilterStatus,
  setTempFilterStatus,
  filterVersion,
  setFilterVersion
}: CarTableProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("vi-VN").format(num);

  const totalPages = Math.ceil(cars.length / itemsPerPage);
  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style jsx global>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.2);
        }
      `}</style>

      <div className="">
        {/* Header - Medium */}
        <div className="mb-3">
          <div className="bg-white rounded-xl shadow-md p-3 border border-emerald-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-lg shadow">
                  <CarIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-gray-800">
                    Danh Sách Xe Điện
                  </h1>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-semibold">
                      <Package className="w-3 h-3 inline mr-1" />
                      {cars.length} xe
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 text-[11px] font-semibold">
                      Trang {currentPage}/{totalPages}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                <Filter className="w-3.5 h-3.5" />
                {showFilters ? "Ẩn lọc" : "Lọc"}
              </button>
            </div>
          </div>
        </div>

        {/* Filter - Medium */}
        {showFilters && (
          <div className="mb-3">
            <div className="bg-white rounded-xl shadow-md p-3 border border-emerald-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
                <div className="relative col-span-full lg:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm VIN hoặc mã xe..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={filterVinContains}
                    onChange={(e) => setFilterVinContains(e.target.value)}
                  />
                </div>

                <select
                  className="px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={tempFilterStatus}
                  onChange={(e) => setTempFilterStatus(e.target.value)}
                >
                  <option value="all">📋 Tất cả trạng thái</option>
                  <option value="IN_FACTORY">🏭 Nhà máy</option>
                  <option value="IN_TRANSIT">🚚 Vận chuyển</option>
                  <option value="IN_STOCK">✅ Trong kho</option>
                  <option value="ALLOCATED">📦 Đã phân bổ</option>
                  <option value="SOLD">💰 Đã bán</option>
                </select>

                <select
                  className="px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={filterColor}
                  onChange={(e) => setFilterColor(e.target.value as ColorEnum)}
                >
                  <option value="">🎨 Tất cả màu</option>
                  <option value="WHITE">Trắng</option>
                  <option value="BLACK">Đen</option>
                  <option value="BLUE">Xanh dương</option>
                  <option value="RED">Đỏ</option>
                  <option value="SILVER">Bạc</option>
                  <option value="GREY">Xám</option>
                  <option value="GREEN">Xanh lá</option>
                  <option value="GOLDEN">Vàng</option>
                </select>

                <select
                  className="px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={filterModelId}
                  onChange={(e) => setFilterModelId(e.target.value)}
                >
                  <option value="">🚗 Tất cả mẫu xe</option>
                  {model.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>

                <select
                  className="px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={filterVersion}
                  onChange={(e) => setFilterVersion(e.target.value as Enum)}
                >
                  <option value="">📦 Tất cả phiên bản</option>
                  {["ECO", "PLUS", "PREMIUM"].map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>

                <select
                  className="px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={filterDealerId}
                  onChange={(e) => setFilterDealerId(e.target.value)}
                >
                  <option value="">🏢 Tất cả đại lý</option>
                  {dealer.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={onSearchFilter}
                  className="px-3 py-2 text-xs bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cars Grid - Medium */}
        {currentCars.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 mb-3">
              {currentCars.map((car, index) => (
                <div
                  key={car.id}
                  onClick={() => onClick(car.id)}
                  className="card-hover relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-emerald-400 cursor-pointer group shadow-md"
                  style={{
                    animation: `scaleIn 0.3s ease-out ${index * 0.03}s both`
                  }}
                >
                  {/* Image - Medium */}
                  <div className="relative h-28 bg-gradient-to-br from-gray-100 to-gray-200">
                    {car.imageUrl ? (
                      <Image
                        src={car.imageUrl}
                        alt={car.vin}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={250}
                        height={250}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-1.5 right-1.5">
                      <span
                        className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r ${
                          statusConfig[car.status]?.gradient ||
                          "from-gray-500 to-gray-600"
                        } text-white shadow-md`}
                      >
                        <span className="text-xs">
                          {statusConfig[car.status]?.icon}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-2.5">
                    {/* Badge */}
                    <div className="mb-1.5">
                      <span className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                        {car.code}
                      </span>
                    </div>

                    {/* VIN */}
                    <h3 className="text-xs font-bold text-gray-900 truncate mb-0.5">
                      {car.vin}
                    </h3>
                    <p className="text-[10px] text-gray-500 mb-2 font-mono">
                      {car.code}
                    </p>

                    {/* Stats - Compact Grid */}
                    <div className="space-y-1.5 mb-2">
                      {/* Row 1: Battery & Range */}
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="flex items-center gap-1 bg-emerald-50 px-1.5 py-1 rounded">
                          <Battery className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] text-gray-500 block">
                              Pin
                            </span>
                            <span className="text-[10px] font-bold text-gray-900 truncate block">
                              {car.batteryKwh}kWh
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 bg-teal-50 px-1.5 py-1 rounded">
                          <Gauge className="w-3 h-3 text-teal-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] text-gray-500 block">
                              Đường
                            </span>
                            <span className="text-[10px] font-bold text-gray-900 truncate block">
                              {formatNumber(car.rangeKm)}km
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Row 2: Seats & Color */}
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="flex items-center gap-1 bg-cyan-50 px-1.5 py-1 rounded">
                          <Users className="w-3 h-3 text-cyan-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] text-gray-500 block">
                              Ghế
                            </span>
                            <span className="text-[10px] font-bold text-gray-900">
                              {car.seat} chỗ
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 bg-purple-50 px-1.5 py-1 rounded">
                          <div
                            className="w-3 h-3 rounded-full border border-gray-300 flex-shrink-0"
                            style={{
                              backgroundColor:
                                colorMap[car.color]?.bg || car.color
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] text-gray-500 block">
                              Màu
                            </span>
                            <span className="text-[10px] font-bold text-gray-900 truncate block">
                              {colorMap[car.color]?.display || car.color}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status Text */}
                      <div className="text-center pt-0.5">
                        <span
                          className={`inline-block px-2 py-1 rounded text-[10px] font-bold bg-gradient-to-r ${
                            statusConfig[car.status]?.gradient ||
                            "from-gray-500 to-gray-600"
                          } text-white w-full shadow`}
                        >
                          {statusConfig[car.status]?.label || car.status}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1.5 pt-2 border-t border-gray-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick(car.id);
                        }}
                        className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-2 py-1 rounded-lg hover:shadow-lg transition-all text-[10px] font-semibold"
                      >
                        <Edit2 className="w-3 h-3" />
                        Sửa
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(car.id);
                        }}
                        className="flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-1 rounded-lg hover:shadow-lg transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white rounded-xl shadow-md p-3 border border-emerald-100">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-600">
                    Hiển thị{" "}
                    <span className="font-bold text-emerald-600">
                      {indexOfFirstCar + 1}
                    </span>
                    {" - "}
                    <span className="font-bold text-emerald-600">
                      {Math.min(indexOfLastCar, cars.length)}
                    </span>
                    {" / "}
                    <span className="font-bold">{cars.length}</span> xe
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg disabled:opacity-50 hover:shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(
                          (page) =>
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                        )
                        .map((page, index, array) => (
                          <React.Fragment key={page}>
                            {index > 0 && array[index - 1] !== page - 1 && (
                              <span className="px-1 text-gray-400 text-xs">
                                ...
                              </span>
                            )}
                            <button
                              onClick={() => goToPage(page)}
                              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                                currentPage === page
                                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        ))}
                    </div>

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg disabled:opacity-50 hover:shadow-lg transition-all"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-10 text-center">
            <CarIcon className="w-14 h-14 text-emerald-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Không tìm thấy xe
            </h3>
            <p className="text-sm text-gray-500">
              Thử điều chỉnh bộ lọc của bạn
            </p>
          </div>
        )}
      </div>
    </>
  );
}
