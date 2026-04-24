"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Battery,
  Gauge,
  Users,
  Palette,
  Search,
  Filter,
  Zap,
  CheckCircle,
  Clock,
  Package,
  Sparkles,
  MapPin,
  Calendar,
  Box,
  ArrowLeft
} from "lucide-react";
import { getVehicleStockById } from "@/services/vehicle/vehicle";
import { Car } from "../../../types";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

const DealerVehicleById: React.FC = () => {
  useAuthGuard(["EVM Staff"]);
  const { dealerId } = useParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const [vehicles, setVehicles] = useState<Car[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getVehicleStockById(String(dealerId));
        if (Array.isArray(response)) {
          setVehicles(response);
        } else {
          setVehicles([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [dealerId]);

  const getStatusConfig = (status: string) => {
    const configs = {
      IN_STOCK: {
        label: "Có sẵn",
        icon: CheckCircle,
        gradient: "from-emerald-500 to-green-600",
        bgGradient: "from-emerald-500/20 to-green-500/20",
        borderColor: "border-emerald-400/50",
        textColor: "text-emerald-400"
      },
      SOLD: {
        label: "Đã bán",
        icon: Package,
        gradient: "from-gray-500 to-slate-600",
        bgGradient: "from-gray-500/20 to-slate-500/20",
        borderColor: "border-gray-400/50",
        textColor: "text-gray-400"
      },
      RESERVED: {
        label: "Đã đặt",
        icon: Clock,
        gradient: "from-amber-500 to-orange-600",
        bgGradient: "from-amber-500/20 to-orange-500/20",
        borderColor: "border-amber-400/50",
        textColor: "text-amber-400"
      }
    };

    return (
      configs[status as keyof typeof configs] || {
        label: status,
        icon: Box,
        gradient: "from-blue-500 to-indigo-600",
        bgGradient: "from-blue-500/20 to-indigo-500/20",
        borderColor: "border-blue-400/50",
        textColor: "text-blue-400"
      }
    );
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.modelName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "ALL" || vehicle.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: vehicles.length,
    available: vehicles.filter((v) => v.status === "IN_STOCK").length,
    sold: vehicles.filter((v) => v.status === "SOLD").length,
    reserved: vehicles.filter((v) => v.status === "RESERVED").length
  };

  return (
    <div className="mt-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group mb-6 flex items-center gap-3 text-white hover:text-blue-400 transition-all duration-300 font-semibold bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 hover:border-blue-500/50 transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-2 transition-transform" />
          <span>Quay lại</span>
        </button>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-5xl font-black text-white mb-3 flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                  <Box className="w-8 h-8 text-white" />
                </div>
                Kho Xe Điện
              </h1>
              <p className="text-gray-400 text-lg">
                Quản lý và theo dõi tất cả xe điện trong kho
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-xl rounded-2xl p-4 border border-blue-500/30">
                <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Tổng số
                </p>
                <p className="text-3xl font-black text-white">{stats.total}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 backdrop-blur-xl rounded-2xl p-4 border border-emerald-500/30">
                <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Có sẵn
                </p>
                <p className="text-3xl font-black text-white">
                  {stats.available}
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 backdrop-blur-xl rounded-2xl p-4 border border-amber-500/30">
                <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Đã đặt
                </p>
                <p className="text-3xl font-black text-white">
                  {stats.reserved}
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-600/20 to-slate-600/20 backdrop-blur-xl rounded-2xl p-4 border border-gray-500/30">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Đã bán
                </p>
                <p className="text-3xl font-black text-white">{stats.sold}</p>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo VIN, mã xe, hoặc model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus("ALL")}
                className={`px-6 py-4 rounded-2xl font-semibold transition-all flex items-center gap-2 ${
                  filterStatus === "ALL"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white/10 backdrop-blur-xl border border-white/20 text-gray-300 hover:bg-white/20"
                }`}
              >
                <Filter className="w-4 h-4" />
                Tất cả
              </button>
              <button
                onClick={() => setFilterStatus("IN_STOCK")}
                className={`px-6 py-4 rounded-2xl font-semibold transition-all ${
                  filterStatus === "IN_STOCK"
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-white/10 backdrop-blur-xl border border-white/20 text-gray-300 hover:bg-white/20"
                }`}
              >
                Có sẵn
              </button>
              <button
                onClick={() => setFilterStatus("RESERVED")}
                className={`px-6 py-4 rounded-2xl font-semibold transition-all ${
                  filterStatus === "RESERVED"
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/30"
                    : "bg-white/10 backdrop-blur-xl border border-white/20 text-gray-300 hover:bg-white/20"
                }`}
              >
                Đã đặt
              </button>
            </div>
          </div>
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle, index) => {
              const statusConfig = getStatusConfig(vehicle.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={vehicle.id}
                  className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2"
                  style={{
                    animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-bl-full blur-2xl" />

                  {/* Status Badge */}
                  <div className="relative mb-6">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${statusConfig.gradient} rounded-full shadow-lg`}
                    >
                      <StatusIcon className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-bold">
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>

                  {/* Vehicle Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-2xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors">
                          {vehicle.modelName}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-lg text-purple-300 text-xs font-bold">
                            {vehicle.version}
                          </span>
                          {vehicle.manufacturerName && (
                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                              <MapPin className="w-3 h-3" />
                              <span>{vehicle.manufacturerName}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* VIN & Code Card */}
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                        VIN
                      </span>
                    </div>
                    <p className="text-white font-mono text-sm mb-3 break-all">
                      {vehicle.vin}
                    </p>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-3" />
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">Mã xe:</span>
                      <span className="text-blue-400 font-mono text-sm font-semibold">
                        {vehicle.code}
                      </span>
                    </div>
                  </div>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {/* Battery */}
                    <div
                      className={`bg-gradient-to-br ${statusConfig.bgGradient} backdrop-blur-sm rounded-xl p-4 border ${statusConfig.borderColor}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Battery
                          className={`w-4 h-4 ${statusConfig.textColor}`}
                        />
                        <span className="text-gray-300 text-xs font-medium">
                          Pin
                        </span>
                      </div>
                      <p className="text-white text-xl font-black">
                        {vehicle.batteryKwh}
                        <span className="text-sm font-semibold text-gray-400 ml-1">
                          kWh
                        </span>
                      </p>
                    </div>

                    {/* Range */}
                    <div
                      className={`bg-gradient-to-br ${statusConfig.bgGradient} backdrop-blur-sm rounded-xl p-4 border ${statusConfig.borderColor}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Gauge
                          className={`w-4 h-4 ${statusConfig.textColor}`}
                        />
                        <span className="text-gray-300 text-xs font-medium">
                          Phạm vi
                        </span>
                      </div>
                      <p className="text-white text-xl font-black">
                        {vehicle.rangeKm.toLocaleString("vi-VN")}
                        <span className="text-sm font-semibold text-gray-400 ml-1">
                          km
                        </span>
                      </p>
                    </div>

                    {/* Seats */}
                    <div
                      className={`bg-gradient-to-br ${statusConfig.bgGradient} backdrop-blur-sm rounded-xl p-4 border ${statusConfig.borderColor}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Users
                          className={`w-4 h-4 ${statusConfig.textColor}`}
                        />
                        <span className="text-gray-300 text-xs font-medium">
                          Chỗ ngồi
                        </span>
                      </div>
                      <p className="text-white text-xl font-black">
                        {vehicle.seat}
                        <span className="text-sm font-semibold text-gray-400 ml-1">
                          chỗ
                        </span>
                      </p>
                    </div>

                    {/* Color */}
                    <div
                      className={`bg-gradient-to-br ${statusConfig.bgGradient} backdrop-blur-sm rounded-xl p-4 border ${statusConfig.borderColor}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Palette
                          className={`w-4 h-4 ${statusConfig.textColor}`}
                        />
                        <span className="text-gray-300 text-xs font-medium">
                          Màu sắc
                        </span>
                      </div>
                      <p className="text-white text-lg font-black">
                        {vehicle.color}
                      </p>
                    </div>
                  </div>

                  {/* Production Date */}
                  {vehicle.productionDate && (
                    <div className="flex items-center gap-2 mb-6 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">Sản xuất:</span>
                      <span className="text-white font-semibold">
                        {new Date(vehicle.productionDate).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Package className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">
              Không tìm thấy xe
            </h3>
            <p className="text-gray-400 text-lg mb-6">
              Không có xe nào phù hợp với tiêu chí tìm kiếm
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("ALL");
              }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:scale-105"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">Hệ thống quản lý xe điện</p>
                <p className="text-gray-400 text-sm">Cập nhật thời gian thực</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2025 EV Management System
              </p>
              <p className="text-gray-500 text-xs">Premium Electric Vehicles</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DealerVehicleById;
