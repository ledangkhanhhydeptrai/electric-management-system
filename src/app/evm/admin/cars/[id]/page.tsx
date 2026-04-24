"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Car } from "../types";
import { getVehicleById } from "@/services/vehicle/vehicle";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

import { statusMap } from "./constant/car-detail-constant";
import { LoadingState } from "./components/LoadingState";
import { NotFoundState } from "./components/NotFoundState";
import { HeroSection } from "./components/HeroSection";
import { PriceCard } from "./components/PriceCard";
import { SpecificationCards } from "./components/SpecificationCards";
import { VehicleDetailsCard } from "./components/VehicleDetailCard";
import { StatusSummaryCard } from "./components/StatusSummaryCard";
import { QuickStatsCard } from "./components/QuickStatsCard";
import { FooterSection } from "./components/FooterSection";

const CarById: React.FC = () => {
  useAuthGuard(["Administrator"]);
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = React.useState<Car | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getVehicleById(String(id));
        if (response) {
          setData(response as Car);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Error:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <LoadingState />;
  }

  if (!data) {
    return <NotFoundState onBack={() => router.back()} />;
  }
  const handleViewDetail = () => {
    router.push(`/evm/staff/cars/${id}/dealer/${data.dealerId}`);
  };
  const currentStatus = statusMap[data.status];

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="group mb-8 flex items-center gap-3 text-gray-800 hover:text-emerald-600 transition-all duration-300 font-bold bg-white hover:bg-emerald-50 backdrop-blur-xl px-6 py-3 rounded-xl border border-emerald-200/50 hover:border-emerald-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-2 transition-transform text-emerald-600" />
            <span>Quay lại danh sách</span>
          </button>

          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-2xl shadow-2xl overflow-hidden border border-emerald-200/50 rounded-3xl">
            {/* Hero Section */}
            <HeroSection
              data={data}
              currentStatus={currentStatus}
              onViewDetail={handleViewDetail}
            />

            {/* Content Section */}
            <div className="p-8 sm:p-12 space-y-8">
              {/* Price Card */}
              <PriceCard />

              {/* Specifications */}
              <SpecificationCards data={data} />

              {/* Vehicle Details & Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Details */}
                <VehicleDetailsCard data={data} />

                {/* Right Column - Status & Stats */}
                <div className="space-y-6">
                  <StatusSummaryCard currentStatus={currentStatus} />
                  <QuickStatsCard data={data} />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <FooterSection />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(-10px) translateX(-10px);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CarById;