import React from "react";
import {
  Car,
  Package,
  CheckCircle,
  ShoppingCart,
  Truck,
  Info,
  Sparkles,
  TrendingUp,
  BarChart3
} from "lucide-react";

interface VehicleDetail {
  vehicleModelId: string;
  vehicleModelName: string;
  qtyOnHand: number;
  available: number;
  qtyReserved: number;
  qtyIncoming: number;
  specifications?: {
    engine?: string;
    fuelType?: string;
    transmission?: string;
    color?: string;
    year?: number;
  };
}

interface VehicleDetailModalProps {
  vehicleDetail: VehicleDetail;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicleDetail
}) => {
  const totalQuantity =
    vehicleDetail.qtyOnHand +
    vehicleDetail.qtyReserved +
    vehicleDetail.qtyIncoming;

  const inventoryStats = [
    {
      label: "Tồn kho",
      value: vehicleDetail.qtyOnHand,
      icon: Package,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-400/50",
      textColor: "text-blue-300",
      shadowColor: "shadow-blue-500/40"
    },
    {
      label: "Khả dụng",
      value: vehicleDetail.available,
      icon: CheckCircle,
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-400/50",
      textColor: "text-emerald-300",
      shadowColor: "shadow-emerald-500/40"
    },
    {
      label: "Đã đặt",
      value: vehicleDetail.qtyReserved,
      icon: ShoppingCart,
      color: "from-orange-500 to-rose-500",
      bgColor: "from-orange-500/20 to-rose-500/20",
      borderColor: "border-orange-400/50",
      textColor: "text-orange-300",
      shadowColor: "shadow-orange-500/40"
    },
    {
      label: "Đang về",
      value: vehicleDetail.qtyIncoming,
      icon: Truck,
      color: "from-purple-500 to-fuchsia-500",
      bgColor: "from-purple-500/20 to-fuchsia-500/20",
      borderColor: "border-purple-400/50",
      textColor: "text-purple-300",
      shadowColor: "shadow-purple-500/40"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Card - Phóng to và đẹp hơn */}
      <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 p-10 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl">
        {/* Animated Background - Lớn hơn */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 animate-pulse blur-3xl" />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full translate-y-36 -translate-x-36 animate-pulse blur-3xl"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping blur-3xl"
          style={{ animationDuration: "3s" }}
        />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <div className="w-28 h-28 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center border-2 border-white/40 shadow-2xl group-hover:scale-110 transition-transform">
              <Car className="w-14 h-14 text-white drop-shadow-2xl" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-3 flex-wrap">
                <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                  <p className="text-white/90 text-sm font-bold uppercase tracking-wide">
                    Mã mẫu xe: {vehicleDetail.vehicleModelId}
                  </p>
                </div>
                <div className="px-4 py-1.5 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-md rounded-full border border-yellow-300/40">
                  <p className="text-yellow-200 text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Premium
                  </p>
                </div>
              </div>
              <h3 className="text-5xl md:text-6xl font-black text-white drop-shadow-2xl mb-2">
                {vehicleDetail.vehicleModelName}
              </h3>
              <p className="text-white/80 text-lg font-medium">
                Thông tin chi tiết về xe
              </p>
            </div>
          </div>

          {/* Total Quantity - Lớn hơn và đẹp hơn */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border-2 border-white/50 shadow-2xl hover:bg-white/25 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-white/90 text-sm font-semibold uppercase mb-1">
                    Tổng số lượng xe
                  </p>
                  <p className="text-white/70 text-xs">Trên toàn hệ thống</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-6xl font-black text-white drop-shadow-2xl block">
                  {totalQuantity}
                </span>
                <span className="text-white/80 text-sm font-semibold">chiếc</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Stats Grid - Cards lớn hơn */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-2xl font-black text-white">Chi tiết số lượng</h4>
            <p className="text-gray-400 text-sm">Phân tích tồn kho theo từng loại</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {inventoryStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`group bg-gradient-to-br ${stat.bgColor} backdrop-blur-md rounded-2xl p-6 border-2 ${stat.borderColor} hover:shadow-2xl ${stat.shadowColor} transition-all duration-300 hover:-translate-y-2 hover:scale-105`}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <p className={`text-sm ${stat.textColor} font-bold uppercase mb-2 tracking-wide`}>
                    {stat.label}
                  </p>
                  <p className="text-5xl font-black text-white drop-shadow-2xl mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-300 font-medium">chiếc</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Specifications - Lớn hơn và rõ ràng hơn */}
      {vehicleDetail.specifications && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-white">Thông số kỹ thuật</h4>
              <p className="text-gray-400 text-sm">Các thông tin chi tiết về xe</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-md rounded-2xl p-8 border-2 border-white/10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {vehicleDetail.specifications.engine && (
                <div className="flex justify-between items-center p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
                  <span className="text-gray-300 font-semibold text-lg">Động cơ</span>
                  <span className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors">
                    {vehicleDetail.specifications.engine}
                  </span>
                </div>
              )}
              {vehicleDetail.specifications.fuelType && (
                <div className="flex justify-between items-center p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
                  <span className="text-gray-300 font-semibold text-lg">Nhiên liệu</span>
                  <span className="text-white font-bold text-lg group-hover:text-emerald-400 transition-colors">
                    {vehicleDetail.specifications.fuelType}
                  </span>
                </div>
              )}
              {vehicleDetail.specifications.transmission && (
                <div className="flex justify-between items-center p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
                  <span className="text-gray-300 font-semibold text-lg">Hộp số</span>
                  <span className="text-white font-bold text-lg group-hover:text-purple-400 transition-colors">
                    {vehicleDetail.specifications.transmission}
                  </span>
                </div>
              )}
              {vehicleDetail.specifications.color && (
                <div className="flex justify-between items-center p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
                  <span className="text-gray-300 font-semibold text-lg">Màu sắc</span>
                  <span className="text-white font-bold text-lg group-hover:text-pink-400 transition-colors">
                    {vehicleDetail.specifications.color}
                  </span>
                </div>
              )}
              {vehicleDetail.specifications.year && (
                <div className="flex justify-between items-center p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
                  <span className="text-gray-300 font-semibold text-lg">Năm sản xuất</span>
                  <span className="text-white font-bold text-lg group-hover:text-orange-400 transition-colors">
                    {vehicleDetail.specifications.year}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Status Summary - Lớn hơn và nổi bật hơn */}
      <div className="bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 backdrop-blur-md rounded-2xl p-8 border-2 border-cyan-400/50 shadow-2xl hover:shadow-cyan-500/30 transition-all">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-black text-2xl mb-4">
              Tóm tắt tình trạng
            </h4>
            <div className="space-y-4 text-base">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <CheckCircle className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                <p className="text-gray-200 leading-relaxed">
                  Có{" "}
                  <span className="font-black text-cyan-300 text-xl">
                    {vehicleDetail.available} chiếc
                  </span>{" "}
                  sẵn sàng bán ngay cho khách hàng
                </p>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <ShoppingCart className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
                <p className="text-gray-200 leading-relaxed">
                  Đang có{" "}
                  <span className="font-black text-orange-300 text-xl">
                    {vehicleDetail.qtyReserved} chiếc
                  </span>{" "}
                  đã được khách hàng đặt trước
                </p>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <Truck className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                <p className="text-gray-200 leading-relaxed">
                  Sắp có thêm{" "}
                  <span className="font-black text-purple-300 text-xl">
                    {vehicleDetail.qtyIncoming} chiếc
                  </span>{" "}
                  đang trên đường về kho
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t-2 border-white/20">
                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-white/10 to-white/5 rounded-xl">
                  <span className="text-white font-bold text-xl">Tổng cộng:</span>
                  <span className="font-black text-white text-4xl drop-shadow-lg">
                    {totalQuantity} <span className="text-xl text-white/80">chiếc</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};