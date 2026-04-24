"use client";
import React from "react";
import { Users, Leaf, Sparkles } from "lucide-react";

interface AccountTableHeaderProps {
  totalAccounts: number;
}

export default function AccountTableHeader({
  totalAccounts
}: AccountTableHeaderProps) {
  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .shimmer-effect {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="relative bg-gradient-to-br from-emerald-500 via-teal-600 to-green-600 px-8 py-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="shimmer-effect absolute inset-0" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Icon Container */}
            <div className="relative float-animation">
              <div className="absolute inset-0 bg-white/30 rounded-3xl blur-xl" />
              <div className="relative w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border-2 border-white/30 shadow-2xl">
                <Leaf className="w-9 h-9 text-white" strokeWidth={2.5} />
              </div>
              {/* Sparkle Badge */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-yellow-800" />
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">
                Bảo vệ môi trường 🌿
              </h1>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-100" />
                <p className="text-emerald-50 text-sm font-medium">
                  Tổng số:{" "}
                  <span className="text-white font-bold">{totalAccounts}</span>{" "}
                  người tham gia
                </p>
              </div>
            </div>
          </div>

          {/* Stats Badge */}
          {/* <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-4 border-2 border-white/30 shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {totalAccounts}
                </div>
                <div className="text-xs text-emerald-100 font-semibold uppercase tracking-wider">
                  Thành viên
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Decorative Dots */}
        <div className="absolute bottom-4 left-8 flex gap-1.5">
          <div className="w-2 h-2 bg-white/30 rounded-full" />
          <div className="w-2 h-2 bg-white/40 rounded-full" />
          <div className="w-2 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </>
  );
}
