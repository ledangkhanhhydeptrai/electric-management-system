"use client";
import React from "react";
import { Inbox, Users } from "lucide-react";

export default function EmptyAccountState() {
  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .pulse-animation {
          animation: pulse 2s ease-in-out infinite;
        }

        .spin-slow {
          animation: spin 20s linear infinite;
        }
      `}</style>

      <div className="flex flex-col items-center justify-center py-20 px-6 fade-in">
        <div className="max-w-md mx-auto text-center">
          {/* Animated Icon Container */}
          <div className="relative inline-block mb-8 float-animation">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-40 pulse-animation" />

            {/* Outer Ring */}
            <div className="absolute inset-0 w-36 h-36 border-4 border-emerald-100 rounded-full spin-slow" />

            {/* Icon Container */}
            <div className="relative w-36 h-36 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center border-4 border-emerald-200 shadow-2xl transform hover:scale-110 transition-all duration-300">
              <Inbox className="w-20 h-20 text-emerald-600" strokeWidth={1.5} />
            </div>

            {/* Decorative Dots */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full shadow-lg" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-teal-400 rounded-full shadow-lg" />
            <div className="absolute top-1/2 -right-3 w-3 h-3 bg-green-400 rounded-full shadow-lg" />
          </div>

          {/* Title */}
          <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
            Chưa có tài khoản nào
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            Danh sách tài khoản hiện đang trống.
            <br />
            Hãy bắt đầu thêm thành viên mới vào hệ thống! 🌱
          </p>

          {/* Stats Row */}
          <div className="flex items-center justify-center gap-6 text-gray-400 pb-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm font-semibold">0 người dùng</span>
            </div>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <span className="text-sm font-semibold">Sẵn sàng phát triển</span>
            </div>
          </div>

          {/* Decorative Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200">
            <div className="flex items-center justify-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-sm font-bold text-emerald-700">
                Hệ thống sẵn sàng đón thành viên mới
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
