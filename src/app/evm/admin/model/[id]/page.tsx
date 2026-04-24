"use client";
import { CountModel, EVModel } from "@/app/types/EV/EVModel";
import { getModelById } from "@/services/vehicleModel/vehicle";
import {
  ArrowLeft,
  Battery,
  Calendar,
  Car,
  CheckCircle2,
  Factory,
  Gauge,
  Info,
  Leaf,
  MapPin,
  Package,
  Shield,
  Sparkles,
  Star,
  Zap
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import LoadingState from "./components/LoadingState";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { getVehicleCountByModelId } from "@/services/vehicle/vehicle";

// Type definition for vehicle variant

const ModelId: React.FC = () => {
  useAuthGuard(["Administrator"]);
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = React.useState<EVModel | null>(null);
  // const [variants, setVariants] = React.useState<CountModel[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getModelById(String(id));
        if (response) {
          setData(response as EVModel);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    // const fetchModel = async () => {
    //   try {
    //     const response = await getVehicleCountByModelId(String(id));
    //     if (Array.isArray(response)) {
    //       setVariants(response);
    //     } else {
    //       setVariants([]);
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // };
    fetchData();
    // fetchModel();
  }, [id]);

  // Color mapping for display
  const getColorDisplay = (color: string) => {
    const colorMap: Record<
      string,
      { name: string; bg: string; border: string }
    > = {
      GREY: { name: "Xám", bg: "bg-gray-400", border: "border-gray-500" },
      BLACK: { name: "Đen", bg: "bg-gray-900", border: "border-gray-950" },
      WHITE: { name: "Trắng", bg: "bg-white", border: "border-gray-300" },
      RED: { name: "Đỏ", bg: "bg-red-500", border: "border-red-600" },
      BLUE: {
        name: "Xanh dương",
        bg: "bg-blue-500",
        border: "border-blue-600"
      },
      SILVER: { name: "Bạc", bg: "bg-gray-300", border: "border-gray-400" }
    };
    return (
      colorMap[color] || {
        name: color,
        bg: "bg-gray-400",
        border: "border-gray-500"
      }
    );
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center py-8 px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-100 to-pink-100 rounded-full blur-3xl opacity-50" />
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Info className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Không tìm thấy
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Model xe này không tồn tại hoặc đã bị xóa khỏi hệ thống.
            </p>
            <button
              onClick={() => router.back()}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold transition-all overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Quay lại danh sách
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-21 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Background decorations */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-200/30 to-purple-200/30 rounded-full blur-3xl -z-10" />

      <div className="">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold transition-all px-4 py-2 rounded-xl hover:bg-white/50"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Quay lại
          </button>
        </div>

        <div className="">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Hero Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />
                <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full animate-pulse" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                        <Zap className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h1 className="text-5xl font-bold text-white mb-2">
                          {data.name}
                        </h1>
                        <p className="text-blue-100 font-medium text-lg flex items-center gap-2">
                          <Factory className="w-5 h-5" />
                          {data.manufacturerName}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full text-white font-bold text-sm flex items-center gap-2 shadow-lg">
                        <Star className="w-4 h-4 fill-current" />
                        4.8/5.0
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-5 py-2.5 bg-white/25 backdrop-blur-sm rounded-full text-white font-semibold flex items-center gap-2 shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      {data.version}
                    </span>
                    <span className="px-5 py-2.5 bg-green-500/30 backdrop-blur-sm rounded-full text-white font-semibold flex items-center gap-2 shadow-lg border border-green-400/40">
                      <CheckCircle2 className="w-4 h-4" />
                      Sẵn hàng
                    </span>
                  </div>
                </div>
              </div>

              {/* Specs Section */}
              <div className="p-8">
                {/* Key Specs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200 hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
                    <div className="flex flex-col gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                          Năm SX
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                          {data.year}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-200 hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
                    <div className="flex flex-col gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Gauge className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                          Mã lực
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                          {data.horsepower}
                          <span className="text-sm text-gray-500 ml-1">HP</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
                    <div className="flex flex-col gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                          Tầm hoạt động
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                          {data.rangeKm}
                          <span className="text-sm text-gray-500 ml-1">km</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200 hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
                    <div className="flex flex-col gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Battery className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                          Pin
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                          {data.batteryCapacity}
                          <span className="text-sm text-gray-500 ml-1">
                            kWh
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle Variants Section */}
                {/* {variants.length > 0 && (
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200 mb-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Car className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Các biến thể có sẵn
                        </h3>
                        <p className="text-sm text-gray-600">
                          Lựa chọn màu sắc và phiên bản
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {variants.map((variant, idx) => {
                        const colorDisplay = getColorDisplay(variant.color);
                        return (
                          <div
                            key={idx}
                            className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all group"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 ${colorDisplay.bg} rounded-lg border-2 ${colorDisplay.border} shadow-md group-hover:scale-110 transition-transform`}
                                />
                                <div>
                                  <div className="font-bold text-gray-900 text-lg">
                                    {colorDisplay.name}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Phiên bản:{" "}
                                    <span className="font-semibold text-indigo-600">
                                      {variant.version}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-lg border border-green-300">
                                <Package className="w-4 h-4 text-green-600" />
                                <span className="font-bold text-green-700 text-sm">
                                  {variant.count} xe
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                              <div className="text-xs text-gray-500">
                                Mã:{" "}
                                <span className="font-mono font-semibold text-gray-700">
                                  {variant.code}
                                </span>
                              </div>
                              <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors">
                                Xem chi tiết →
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )} */}

                {/* Description */}
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border-2 border-gray-200 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                      <Info className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Mô tả chi tiết
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {data.description}
                  </p>
                </div>

                {/* Manufacturer Info */}
                <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border-2 border-purple-200 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Factory className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-600 uppercase mb-1">
                      Nhà sản xuất
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {data.manufacturerName}
                    </div>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: Shield,
                      title: "An toàn 5 sao",
                      desc: "ADAS đầy đủ",
                      color: "from-blue-500 to-cyan-500"
                    },
                    {
                      icon: Leaf,
                      title: "Thân thiện",
                      desc: "Zero emission",
                      color: "from-green-500 to-emerald-500"
                    }
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 hover:border-gray-300 transition-all"
                    >
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center`}
                      >
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {feature.title}
                        </div>
                        <div className="text-xs text-gray-600">
                          {feature.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelId;
