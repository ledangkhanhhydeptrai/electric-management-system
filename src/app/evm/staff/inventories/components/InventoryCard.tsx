// components/InventoryCard.tsx
import React, { useState, useMemo } from "react";
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
  ChevronDown,
  ChevronRight,
  Package,
  Eye
} from "lucide-react";
import Image from "next/image";

export interface Car {
  id: string;
  vin: string;
  code: string;
  batteryKwh: number;
  rangeKm: number;
  seat: number;
  baseWarrantyMonths: number;
  color: string;
  status: string;
  manufacturerName: string;
  modelName: string;
  dealerId: string;
  version: string;
  productionDate: string;
  imageUrl: string;
}

interface InventoryCardProps {
  cars: Car[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
}

// Grouped Car Interface
interface GroupedCar {
  key: string;
  code: string;
  color: string;
  batteryKwh: number;
  rangeKm: number;
  seat: number;
  status: string;
  count: number;
  cars: Car[];
}

export const InventoryCard: React.FC<InventoryCardProps> = ({
  cars,
  onEdit,
  onDelete,
  onClick
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Color mapping
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

  // Status configuration
  const statusConfig: {
    [key: string]: { label: string; icon: string; class: string };
  } = {
    IN_FACTORY: {
      label: "Trong nhà máy",
      icon: "🏭",
      class: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/50"
    },
    IN_TRANSIT: {
      label: "Đang vận chuyển",
      icon: "🚚",
      class: "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/50"
    },
    IN_STOCK: {
      label: "Trong kho",
      icon: "✅",
      class: "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-emerald-500/50"
    },
    ALLOCATED: {
      label: "Đã phân bổ",
      icon: "📦",
      class: "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-purple-500/50"
    },
    SOLD: {
      label: "Đã bán",
      icon: "💰",
      class: "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-gray-500/50"
    }
  };

  // Group cars by identical properties
  const groupedCars = useMemo(() => {
    const filtered = cars.filter(
      (car) =>
        car.vin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.modelName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groups: { [key: string]: GroupedCar } = {};

    filtered.forEach((car) => {
      const key = `${car.code}-${car.color}-${car.batteryKwh}-${car.rangeKm}-${car.seat}-${car.status}`;

      if (!groups[key]) {
        groups[key] = {
          key,
          code: car.code,
          color: car.color,
          batteryKwh: car.batteryKwh,
          rangeKm: car.rangeKm,
          seat: car.seat,
          status: car.status,
          count: 0,
          cars: []
        };
      }

      groups[key].count++;
      groups[key].cars.push(car);
    });

    return Object.values(groups);
  }, [cars, searchTerm]);

  // Toggle expand/collapse group
  const toggleGroup = (key: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedGroups(newExpanded);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes expandDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 500px;
            transform: translateY(0);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%);
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
        }

        .filter-card {
          animation: scaleIn 0.4s ease-out;
        }

        .child-row {
          animation: expandDown 0.3s ease-out;
        }
      `}</style>

      <div className="">
        {/* Header Section */}
        <div className="mb-5 animate-fadeInUp">
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Title & Stats */}
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-4 rounded-2xl shadow-lg shadow-blue-500/30">
                  <CarIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Tồn Kho Xe Điện
                  </h1>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-xs font-semibold shadow-sm">
                      <Package className="w-3 h-3 mr-2" />
                      {groupedCars.length} nhóm xe
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs font-semibold shadow-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      {cars.length} xe tổng
                    </span>
                  </div>
                </div>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        {showFilters && (
          <div className="mb-5 filter-card">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-blue-600" />
                  Bộ lọc tìm kiếm
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm VIN, mã xe hoặc model..."
                  className="w-full pl-11 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md text-gray-700 font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                    Thông tin xe
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                    Màu sắc
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                    Pin (kWh)
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                    Quãng đường
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                    Số ghế
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                    Số lượng
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {groupedCars.map((group, index) => (
                  <React.Fragment key={group.key}>
                    {/* Parent Row - Grouped Car */}
                    <tr
                      className="card-hover cursor-pointer bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                      onClick={() => toggleGroup(group.key)}
                      style={{
                        animation: `slideIn 0.4s ease-out ${index * 0.05}s both`
                      }}
                    >
                      {/* Car Info */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-transparent border-l-4 border-blue-500 rounded-lg p-3 hover:shadow-md hover:from-blue-100 transition-all duration-300 group">
                          {/* Expand/Collapse Icon */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleGroup(group.key);
                            }}
                            className="flex-shrink-0 p-1 hover:bg-blue-100 rounded-lg transition-all"
                          >
                            {expandedGroups.has(group.key) ? (
                              <ChevronDown className="w-5 h-5 text-blue-600" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-blue-600" />
                            )}
                          </button>

                          {/* Icon */}
                          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all duration-300">
                            <CarIcon className="w-5 h-5 text-white" />
                          </div>

                          {/* Info */}
                          <div className="flex-1">
                            <div className="font-bold text-gray-900 text-sm mb-0.5">
                              {group.code}
                            </div>
                            <div className="text-xs text-gray-500">
                              Click để xem chi tiết VIN
                            </div>
                          </div>

                          {/* Badge */}
                          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                        </div>
                      </td>

                      {/* Color */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-center">
                          <div
                            className="w-8 h-8 rounded-xl shadow-lg ring-4 ring-white border-2 border-gray-200"
                            style={{
                              backgroundColor: colorMap[group.color]?.bg || group.color
                            }}
                          />
                          <span className="font-semibold text-sm text-gray-700">
                            {colorMap[group.color]?.display || group.color}
                          </span>
                        </div>
                      </td>

                      {/* Battery */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-center">
                          <Battery className="w-4 h-4 text-green-600" />
                          <span className="font-bold text-sm text-gray-900">
                            {group.batteryKwh}
                          </span>
                          <span className="text-xs text-gray-500">kWh</span>
                        </div>
                      </td>

                      {/* Range */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-center">
                          <Gauge className="w-4 h-4 text-blue-600" />
                          <span className="font-bold text-sm text-gray-900">
                            {group.rangeKm}
                          </span>
                          <span className="text-xs text-gray-500">km</span>
                        </div>
                      </td>

                      {/* Seats */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-center">
                          <Users className="w-4 h-4 text-purple-600" />
                          <span className="font-bold text-sm text-gray-900">
                            {group.seat}
                          </span>
                          <span className="text-xs text-gray-500">chỗ</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`relative inline-flex items-center gap-2 py-1.5 rounded-xl text-xs font-bold shadow-lg hover:shadow-2xl transition-all duration-300 pl-2 pr-4 ${
                            statusConfig[group.status]?.class || "bg-gray-500 text-white"
                          }`}
                        >
                          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/20 shadow-inner flex-shrink-0">
                            <span className="text-lg drop-shadow-lg">
                              {statusConfig[group.status]?.icon}
                            </span>
                          </span>
                          <span className="text-xs font-extrabold whitespace-nowrap">
                            {statusConfig[group.status]?.label || group.status}
                          </span>
                        </span>
                      </td>

                      {/* Count */}
                      <td className="px-4 py-3 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg">
                          <Package className="w-4 h-4" />
                          <span className="font-bold text-sm">{group.count}</span>
                        </div>
                      </td>

                      {/* Actions - Parent level */}
                      <td className="px-4 py-3 text-center">
                        <span className="text-xs text-gray-400 italic">Mở để xem</span>
                      </td>
                    </tr>

                    {/* Child Rows - Individual Cars */}
                    {expandedGroups.has(group.key) &&
                      group.cars.map((car, carIndex) => (
                        <tr
                          key={car.vin}
                          className="child-row bg-gradient-to-r from-slate-50 to-blue-50/30 hover:from-blue-100 hover:to-indigo-100 transition-all cursor-pointer border-l-4 border-indigo-300"
                          onClick={() => onClick?.(car.id)}
                        >
                          {/* VIN Info (Indented) */}
                          <td className="px-4 py-2" colSpan={6}>
                            <div className="flex items-center gap-3 ml-12 pl-4 border-l-2 border-dashed border-indigo-300">
                              <div className="flex items-center gap-2 flex-1">
                                <span className="text-xs font-medium text-gray-500">
                                  #{carIndex + 1}
                                </span>
                                <span className="text-xs font-medium text-gray-400">
                                  VIN:
                                </span>
                                <span className="font-mono text-sm font-semibold text-gray-800">
                                  {car.vin}
                                </span>
                                <span className="text-xs text-gray-400">| Code:</span>
                                <span className="text-sm font-semibold text-gray-700">
                                  {car.code}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Empty count cell */}
                          <td className="px-4 py-2"></td>

                          {/* Actions for individual car */}
                          <td className="px-4 py-2">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEdit?.(car.id);
                                }}
                                className="group p-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-110 transition-all duration-200 shadow-md shadow-blue-500/30"
                                title="Chỉnh sửa"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDelete?.(car.id);
                                }}
                                className="group p-1.5 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:shadow-lg hover:scale-110 transition-all duration-200 shadow-md shadow-red-500/30"
                                title="Xóa"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {groupedCars.length === 0 && (
            <div className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-3xl mb-4 shadow-xl">
                <CarIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Không tìm thấy xe nào
              </h3>
              <p className="text-gray-500 text-sm">
                Thử điều chỉnh bộ lọc hoặc thêm xe mới vào kho
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};