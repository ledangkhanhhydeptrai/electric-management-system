"use client";
import React from "react";
import { UserX, Search } from "lucide-react";

interface EmptyUserStateProps {
  searchTerm: string;
}

export default function EmptyUserState({ searchTerm }: EmptyUserStateProps) {
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
            opacity: 0.6;
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
      `}</style>

      <div className="flex flex-col items-center justify-center py-20 fade-in">
        <div className="max-w-md mx-auto text-center">
          {/* Animated Icon Container */}
          <div className="relative inline-block mb-8 float-animation">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-50 pulse-animation" />

            {/* Icon Container */}
            <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center border-4 border-emerald-200 shadow-xl transform hover:scale-110 transition-all duration-300">
              {searchTerm ? (
                <Search
                  className="w-16 h-16 text-emerald-600"
                  strokeWidth={1.5}
                />
              ) : (
                <UserX
                  className="w-16 h-16 text-emerald-600"
                  strokeWidth={1.5}
                />
              )}
            </div>

            {/* Decorative Dots */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-teal-400 rounded-full" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {searchTerm ? "Không tìm thấy người dùng" : "Chưa có người dùng"}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {searchTerm ? (
              <>
                Không tìm thấy kết quả cho{" "}
                <span className="font-semibold text-emerald-600">
                  {searchTerm}
                </span>
                <br />
                Hãy thử với từ khóa khác
              </>
            ) : (
              <>
                Danh sách người dùng hiện đang trống
                <br />
                Hãy bắt đầu thêm người dùng mới
              </>
            )}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              {searchTerm ? (
                <>
                  <Search className="w-5 h-5" />
                  <span className="text-sm font-medium">0 kết quả</span>
                </>
              ) : (
                <>
                  <UserX className="w-5 h-5" />
                  <span className="text-sm font-medium">0 người dùng</span>
                </>
              )}
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-1">
              <span className="text-2xl">🌱</span>
              <span className="text-sm font-medium">Sẵn sàng bắt đầu</span>
            </div>
          </div>

          {/* Decorative Element */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-emerald-600">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-sm font-medium">
                {searchTerm ? "Đang tìm kiếm..." : "Hệ thống sẵn sàng"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
