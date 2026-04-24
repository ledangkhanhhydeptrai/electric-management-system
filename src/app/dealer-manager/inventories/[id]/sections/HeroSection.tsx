import React from "react";
import { Car, Sparkles } from "lucide-react";
import { StockStatus } from "../shared/stockStatus";

interface HeroSectionProps {
  vehicleModelName: string;
  stockStatus: StockStatus;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  vehicleModelName,
  stockStatus
}) => {
  const StatusIcon = stockStatus.icon;

  return (
    <div
      className={`bg-gradient-to-r ${stockStatus.bgColor} p-8 relative overflow-hidden`}
    >
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 animate-pulse blur-3xl" />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32 animate-pulse blur-3xl"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping blur-2xl"
        style={{ animationDuration: "3s" }}
      />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
          <div className="flex items-center gap-4 animate-fade-in">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border-2 border-white/40 shadow-2xl hover:scale-110 transition-transform duration-300">
              <Car className="w-12 h-12 text-white drop-shadow-2xl" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white mb-3 drop-shadow-2xl">
                {vehicleModelName || "N/A"}
              </h1>
              <div className="flex items-center gap-3">
                <span
                  className={`px-5 py-2 ${stockStatus.badgeBg} backdrop-blur-md rounded-xl ${stockStatus.textColor} font-bold text-sm flex items-center gap-2 border-2 ${stockStatus.borderColor} shadow-xl hover:scale-105 transition-transform`}
                >
                  <StatusIcon className="w-5 h-5 animate-pulse" />
                  {stockStatus.status}
                </span>
                <span className="px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 backdrop-blur-md rounded-xl text-white font-bold text-sm border-2 border-white/40 shadow-xl flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  Premium
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};