import React from "react";
import { CarFront } from "lucide-react";

export const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block mb-8">
          <div className="w-32 h-32 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <CarFront className="w-12 h-12 text-blue-400 animate-pulse" />
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-white text-xl font-bold animate-pulse">
            Đang tải thông tin xe...
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
};
