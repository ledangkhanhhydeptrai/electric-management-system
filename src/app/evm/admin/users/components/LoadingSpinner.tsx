"use client";
import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <>
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        .pulse-ring {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .bounce-dot {
          animation: bounce 1.4s infinite;
        }
      `}</style>

      <div className="flex flex-col items-center justify-center py-20">
        {/* Spinner Container */}
        <div className="relative mb-8">
          {/* Outer Ring */}
          <div className="w-24 h-24 rounded-full border-4 border-emerald-100" />

          {/* Spinning Ring */}
          <div className="spinner absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-emerald-500 border-t-transparent" />

          {/* Pulse Ring */}
          <div className="pulse-ring absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-teal-400 border-t-transparent opacity-30" />

          {/* Center Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader2
              className="w-10 h-10 text-emerald-600 spinner"
              strokeWidth={2.5}
            />
          </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-3">
          <h3 className="text-xl font-bold text-gray-800">
            Đang tải dữ liệu...
          </h3>
          <p className="text-sm text-gray-600">Vui lòng đợi trong giây lát</p>

          {/* Loading Dots */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div
              className="w-2 h-2 bg-emerald-500 rounded-full bounce-dot"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="w-2 h-2 bg-emerald-500 rounded-full bounce-dot"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-2 h-2 bg-emerald-500 rounded-full bounce-dot"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>

        {/* Progress Info */}
        <div className="mt-8 px-6 py-3 bg-emerald-50 rounded-2xl border border-emerald-200">
          <p className="text-xs text-emerald-700 font-medium">
            🌱 Đang tải danh sách người dùng
          </p>
        </div>
      </div>
    </>
  );
}
