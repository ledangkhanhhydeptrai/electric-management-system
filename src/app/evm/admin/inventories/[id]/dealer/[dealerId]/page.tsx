"use client";
import React from "react";
import {
  ArrowLeft,
  Building2,
  Package,
  TrendingUp,
  Car,
  BarChart3,
  CheckCircle,
  Clock,
  XCircle,
  Palette,
  Calendar,
  Sparkles,
  Box
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { getInventoryByDealerId } from "@/services/inventoriesService/inventories";

interface InventorySummary {
  modelName: string;
  year: number;
  version: string;
  color: string;
  status: string;
  quantity: number;
}

export default function DealerDetail() {
  useAuthGuard(["Administrator"]);
  const { dealerId } = useParams();
  const router = useRouter();
  const [data, setData] = React.useState<InventorySummary[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!dealerId) return;
    const fetchData = async () => {
      try {
        const response = await getInventoryByDealerId(String(dealerId));
        if (Array.isArray(response)) {
          setData(response);
          // Giả sử bạn có tên dealer từ response hoặc từ API khác
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
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
        textColor: "text-emerald-400",
        dotColor: "bg-emerald-500"
      },
      SOLD: {
        label: "Đã bán",
        icon: XCircle,
        gradient: "from-gray-500 to-slate-600",
        bgGradient: "from-gray-500/20 to-slate-500/20",
        borderColor: "border-gray-400/50",
        textColor: "text-gray-400",
        dotColor: "bg-gray-500"
      },
      RESERVED: {
        label: "Đã đặt",
        icon: Clock,
        gradient: "from-amber-500 to-orange-600",
        bgGradient: "from-amber-500/20 to-orange-500/20",
        borderColor: "border-amber-400/50",
        textColor: "text-amber-400",
        dotColor: "bg-amber-500"
      }
    };

    return (
      configs[status as keyof typeof configs] || {
        label: status,
        icon: Package,
        gradient: "from-blue-500 to-indigo-600",
        bgGradient: "from-blue-500/20 to-indigo-500/20",
        borderColor: "border-blue-400/50",
        textColor: "text-blue-400",
        dotColor: "bg-blue-500"
      }
    );
  };

  // Tính toán thống kê
  const stats = React.useMemo(() => {
    const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);
    const availableQuantity = data
      .filter((item) => item.status === "IN_STOCK")
      .reduce((sum, item) => sum + item.quantity, 0);
    const soldQuantity = data
      .filter((item) => item.status === "SOLD")
      .reduce((sum, item) => sum + item.quantity, 0);
    const reservedQuantity = data
      .filter((item) => item.status === "RESERVED")
      .reduce((sum, item) => sum + item.quantity, 0);
    const totalModels = data.length;

    return {
      totalQuantity,
      availableQuantity,
      soldQuantity,
      reservedQuantity,
      totalModels
    };
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Building2 className="w-12 h-12 text-blue-400 animate-pulse" />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-white text-xl font-bold animate-pulse">
              Đang tải thông tin đại lý...
            </p>
            <div className="flex items-center justify-center gap-2">
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-12 text-center max-w-lg border border-gray-700">
          <div className="w-28 h-28 bg-red-900 bg-opacity-50 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-red-700">
            <Building2 className="w-16 h-16 text-red-400" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Không tìm thấy dữ liệu
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Không có thông tin điều phối cho đại lý này
          </p>
          <button
            onClick={() => router.back()}
            className="group px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-3 mx-auto transform hover:scale-105"
          >
            <ArrowLeft className="w-6 h-6 transform group-hover:-translate-x-2 transition-transform" />
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group mb-6 flex items-center gap-3 text-white hover:text-blue-400 transition-all duration-300 font-semibold bg-white/10 backdrop-blur-xl px-6 py-3 border border-white/20 hover:bg-white/20 hover:border-blue-500/50 transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-2 transition-transform" />
          <span>Quay lại danh sách đại lý</span>
        </button>

        {/* Dealer Header */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 mb-8">
          {/* Statistics */}
          <div className="p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <BarChart3 className="w-7 h-7 text-blue-400" />
              Tổng quan điều phối
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {/* Total Quantity */}
              <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/20 transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Tổng số xe
                </p>
                <p className="text-4xl font-black text-white">
                  {stats.totalQuantity}
                </p>
              </div>

              {/* Available */}
              <div className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 backdrop-blur-xl rounded-2xl p-6 border border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Có sẵn
                </p>
                <p className="text-4xl font-black text-white">
                  {stats.availableQuantity}
                </p>
              </div>

              {/* Reserved */}
              <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/20 transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Đã đặt
                </p>
                <p className="text-4xl font-black text-white">
                  {stats.reservedQuantity}
                </p>
              </div>

              {/* Sold */}
              <div className="bg-gradient-to-br from-gray-600/20 to-slate-600/20 backdrop-blur-xl rounded-2xl p-6 border border-gray-500/30 hover:shadow-2xl hover:shadow-gray-500/20 transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Đã bán
                </p>
                <p className="text-4xl font-black text-white">
                  {stats.soldQuantity}
                </p>
              </div>

              {/* Total Models */}
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Box className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Số model
                </p>
                <p className="text-4xl font-black text-white">
                  {stats.totalModels}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory List */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-400" />
            Chi tiết điều phối
            <span className="text-lg font-semibold text-gray-400">
              ({data.length} models)
            </span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.map((item, index) => {
              const statusConfig = getStatusConfig(item.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={index}
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

                  {/* Model Header */}
                  <div className="mb-6">
                    <h4 className="text-2xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {item.modelName}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-lg text-purple-300 text-xs font-bold">
                        {item.version}
                      </span>
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{item.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-4 mb-6">
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
                        {item.color}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                          Số lượng
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <p className="text-4xl font-black text-white">
                          {item.quantity}
                        </p>
                        <span className="text-gray-400 text-sm font-semibold">
                          xe
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">
                  Hệ thống quản lý đại lý xe điện
                </p>
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
}
