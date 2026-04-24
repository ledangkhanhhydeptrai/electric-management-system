import React from "react";
import {
  CarFront,
  MapPin,
  Sparkles,
  FileText,
  ChevronRight
} from "lucide-react";
import { Car } from "../../types";

interface HeroSectionProps {
  data: Car;
  currentStatus: {
    label: string;
    color: string;
    gradient: string;
    emoji: string;
  };
  onViewDetail: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  currentStatus,
  onViewDetail
}) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 sm:p-12 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10">
        {/* Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div
            className={`bg-gradient-to-r ${currentStatus.gradient} px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3 transform hover:scale-105 transition-transform`}
          >
            <span className="text-3xl animate-bounce">
              {currentStatus.emoji}
            </span>
            <div>
              <p className="text-white text-opacity-80 text-xs font-medium">
                Trạng thái
              </p>
              <p className="text-white font-bold text-lg">
                {currentStatus.label}
              </p>
            </div>
          </div>
          <div className="bg-black bg-opacity-10 backdrop-blur-md px-4 py-2 rounded-xl border border-white border-opacity-20">
            <p className="text-white text-sm font-mono">{data.code}</p>
          </div>
        </div>

        {/* VIN & Model */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="w-20 h-20 bg-white bg-opacity-20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white border-opacity-30 transform hover:rotate-12 transition-transform">
            <CarFront className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              <span className="text-blue-200 text-sm font-bold uppercase tracking-wider">
                Số khung xe
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight font-mono">
              {data.vin}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-white text-2xl font-bold">{data.modelName}</p>
              <div className="h-8 w-px bg-white bg-opacity-30" />
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-200" />
                <p className="text-blue-100 text-lg font-medium">
                  {data.manufacturerName}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nút Xem Chi Tiết */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={onViewDetail}
            className="group relative px-8 py-4 bg-blue-600 bg-opacity-10 backdrop-blur-md rounded-2xl border-2 border-white border-opacity-30 hover:bg-opacity-20 hover:border-opacity-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

            <div className="relative flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-lg flex items-center gap-2">
                  Xem Chi Tiết Đầy Đủ
                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </p>
                <p className="text-blue-100 text-xs">
                  Thông số kỹ thuật & Tài liệu
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
