"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Car, TrendingUp, Package, CheckCircle } from "lucide-react";
import { InventoryItem } from "../types/types";
import {
  getInventoryById,
  getModelInventoryId
} from "@/services/inventoriesService/inventories";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { LoadingSpinner } from "./shared/LoadingSpinner";
import { NotFoundCard } from "./shared/NotFoundCard";
import { StatsGrid } from "./sections/StatsGrid";
import { VehicleInfoCard } from "./sections/VehicleInfoCard";
import { DealerInfoCard } from "./sections/DealerInfoCard";
import { TimelineCard } from "./sections/TimelineCard";
import { getStockStatus } from "./shared/stockStatus";
import { calculatePercentage } from "./shared/formatters";

export default function InventoryDetail() {
  useAuthGuard(["Administrator"]);
  const { id } = useParams();
  const [data, setData] = React.useState<InventoryItem | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const router = useRouter();
  const [totalModelQuantity, setTotalModelQuantity] = React.useState<
    number | null
  >(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInventoryById(String(id));
        if (response) {
          setData(response as InventoryItem);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchModelInventory = async () => {
      if (!data?.vehicleModelId) return;
      try {
        const res = await getModelInventoryId(String(data.vehicleModelId));
        if (res) setTotalModelQuantity(res as number);
      } catch (error) {
        console.error("Error fetching model inventory:", error);
      }
    };

    if (data?.vehicleModelId) {
      fetchModelInventory();
    }
    fetchData();
  }, [id, data?.vehicleModelId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return <NotFoundCard onBack={() => router.back()} />;
  }

  const stockStatus = getStockStatus(data);
  const availablePercentage = calculatePercentage(
    data.available,
    data.qtyOnHand
  );

  return (
    <div className="mt-20 w-full bg-gradient-to-br from-indigo-950 via-purple-950 to-fuchsia-950 flex flex-col">
      {/* Full Width Container */}
      <div className="">
        {/* Header with Back Button */}
        <div className="px-6 pt-6 pb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border border-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Quay lại danh sách</span>
          </button>
        </div>

        {/* Main Content - Full Width */}
        <div className="px-6 pb-6">
          {/* Hero Section - Green to Cyan Gradient */}
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl p-8 mb-6 relative overflow-hidden shadow-2xl">
            {/* Animated Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 blur-3xl animate-pulse" />
            <div
              className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full translate-y-36 -translate-x-36 blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />

            <div className="relative z-10 flex items-center gap-6">
              {/* Icon */}
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border-2 border-white/30 shadow-xl">
                <Car className="w-10 h-10 text-white" />
              </div>

              {/* Title and Badges */}
              <div className="flex-1">
                <h1 className="text-5xl font-black text-white drop-shadow-2xl mb-3">
                  {data.vehicleModelName}
                </h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white font-bold text-sm flex items-center gap-2 border border-white/30">
                    <CheckCircle className="w-5 h-5" />
                    {stockStatus.status}
                  </span>
                  <span className="px-4 py-2 bg-yellow-400/90 backdrop-blur-md rounded-xl text-gray-900 font-bold text-sm flex items-center gap-2 border border-yellow-300">
                    <span>⭐</span>
                    Premium
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            {/* Total Model Quantity Card - Yellow/Brown */}
            {totalModelQuantity !== null && (
              <div className="bg-gradient-to-br from-yellow-600 via-yellow-700 to-orange-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="text-white/90 text-sm font-bold uppercase tracking-wider mb-1">
                          TỔNG TỒN KHO MODEL
                        </p>
                        <p className="text-7xl font-black text-white drop-shadow-2xl">
                          {totalModelQuantity.toLocaleString("vi-VN")}
                        </p>
                      </div>
                    </div>
                    <Package className="w-12 h-12 text-white/30" />
                  </div>
                  <p className="text-white/80 font-medium">
                    Tổng số lượng xe của model này trong toàn hệ thống
                  </p>
                </div>
              </div>
            )}

            {/* Progress Bar Card - Dark Gray/Blue */}
            <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">
                    Tỷ lệ hàng khả dụng
                  </h3>
                  <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    {availablePercentage}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${availablePercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>

                {/* Stats Below Progress */}
                <div className="flex justify-between mt-4 text-white">
                  <div>
                    <span className="text-3xl font-black">
                      {data.available}
                    </span>
                    <span className="text-white/70 ml-2">khả dụng</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black">
                      {data.qtyOnHand}
                    </span>
                    <span className="text-white/70 ml-2">tổng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-6">
            <StatsGrid
              qtyOnHand={data.qtyOnHand}
              available={data.available}
              qtyReserved={data.qtyReserved}
              qtyIncoming={data.qtyIncoming}
            />
          </div>

          {/* Detail Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VehicleInfoCard
              vehicleModelId={data.vehicleModelId}
              vehicleModelName={data.vehicleModelName}
              qtyOnHand={data.qtyOnHand}
              available={data.available}
              qtyReserved={data.qtyReserved}
              qtyIncoming={data.qtyIncoming}
            />
            <DealerInfoCard
              dealerName={data.dealerName}
              onClick={() =>
                router.push(
                  `/evm/admin/inventories/${id}/dealer/${data.dealerId}`
                )
              }
            />
            <TimelineCard
              createdAt={data.createdAt}
              updatedAt={data.updatedAt}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
