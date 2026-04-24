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
  useAuthGuard(["EVM Staff"]);
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
    <div className="mt-20 w-full bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 flex flex-col min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Full Width Container */}
      <div className="relative z-10">
        {/* Header with Back Button */}
        <div className="px-6 pt-6 pb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-emerald-50 text-gray-800 rounded-xl transition-all shadow-lg border border-emerald-200/50 hover:border-emerald-300 hover:shadow-xl hover:scale-105 duration-300 backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-emerald-600" />
            <span className="font-bold">Quay lại danh sách</span>
          </button>
        </div>

        {/* Main Content - Full Width */}
        <div className="px-6 pb-6">
          {/* Hero Section - Emerald to Cyan Gradient */}
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl p-8 mb-6 relative overflow-hidden shadow-2xl border border-emerald-400/30">
            {/* Animated Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full -translate-y-48 translate-x-48 blur-3xl animate-pulse" />
            <div
              className="absolute bottom-0 left-0 w-72 h-72 bg-white/20 rounded-full translate-y-36 -translate-x-36 blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            <div className="relative z-10 flex items-center gap-6">
              {/* Icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/40 rounded-2xl blur-xl"></div>
                <div className="relative w-20 h-20 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center border-2 border-white/50 shadow-2xl">
                  <Car className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Title and Badges */}
              <div className="flex-1">
                <h1 className="text-5xl font-black text-white drop-shadow-2xl mb-3">
                  {data.vehicleModelName}
                </h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-4 py-2 bg-white/30 backdrop-blur-md rounded-xl text-white font-bold text-sm flex items-center gap-2 border border-white/40 shadow-lg">
                    <CheckCircle className="w-5 h-5" />
                    {stockStatus.status}
                  </span>
                  <span className="px-4 py-2 bg-yellow-400 backdrop-blur-md rounded-xl text-gray-900 font-bold text-sm flex items-center gap-2 border border-yellow-300 shadow-lg">
                    <span>⭐</span>
                    Premium
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            {/* Total Model Quantity Card - Gradient Yellow/Orange */}
            {totalModelQuantity !== null && (
              <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 rounded-3xl p-8 relative overflow-hidden shadow-2xl border border-orange-300">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/40 rounded-2xl blur-lg"></div>
                        <div className="relative w-16 h-16 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center border-2 border-white/40">
                          <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-white/95 text-sm font-bold uppercase tracking-wider mb-1">
                          TỔNG TỒN KHO MODEL
                        </p>
                        <p className="text-7xl font-black text-white drop-shadow-2xl">
                          {totalModelQuantity.toLocaleString("vi-VN")}
                        </p>
                      </div>
                    </div>
                    <Package className="w-12 h-12 text-white/40" />
                  </div>
                  <p className="text-white/90 font-semibold">
                    Tổng số lượng xe của model này trong toàn hệ thống
                  </p>
                </div>
              </div>
            )}

            {/* Progress Bar Card - White with gradient accent */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-emerald-200/50">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Tỷ lệ hàng khả dụng
                  </h3>
                  <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                    {availablePercentage}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-5 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 rounded-full transition-all duration-1000 shadow-lg"
                    style={{ width: `${availablePercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                  </div>
                </div>

                {/* Stats Below Progress */}
                <div className="flex justify-between mt-4 text-gray-800">
                  <div>
                    <span className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      {data.available}
                    </span>
                    <span className="text-gray-600 ml-2 font-semibold">khả dụng</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                      {data.qtyOnHand}
                    </span>
                    <span className="text-gray-600 ml-2 font-semibold">tổng</span>
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
              onClick={()=>router.push(`/evm/staff/inventories/${id}/dealer/${data.dealerId}`)}
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