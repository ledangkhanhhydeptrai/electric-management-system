"use client";
import React from "react";
import {

  Loader2
} from "lucide-react";

// ===== Loading State Component =====
export function LoadingProfile() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_60%,rgba(20,184,166,0.15),transparent_50%)]"></div>
      </div>

      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-300/20 via-teal-300/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div
        className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-cyan-300/20 via-blue-300/20 to-transparent rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Loading Hero Card */}
        <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-[2.5rem] shadow-2xl overflow-hidden p-12">
          <div className="absolute inset-0 bg-white/5"></div>

          <div className="relative flex flex-col lg:flex-row items-center gap-12">
            {/* Animated Avatar Skeleton */}
            <div className="relative">
              <div className="w-48 h-48 bg-white/20 backdrop-blur-xl rounded-full border-4 border-white shadow-2xl ring-8 ring-white/20 flex items-center justify-center">
                <Loader2
                  className="w-24 h-24 text-white animate-spin"
                  strokeWidth={1.5}
                />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/30 rounded-full animate-pulse"></div>
              <div
                className="absolute -bottom-4 -left-4 w-14 h-14 bg-white/30 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>

            {/* Loading Text */}
            <div className="flex-1 text-center lg:text-left text-white space-y-6">
              <div className="space-y-3">
                <div className="h-12 bg-white/20 rounded-2xl animate-pulse max-w-md mx-auto lg:mx-0"></div>
                <div
                  className="h-6 bg-white/15 rounded-xl animate-pulse max-w-xs mx-auto lg:mx-0"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>

              <div
                className="h-16 bg-white/20 rounded-2xl animate-pulse max-w-sm mx-auto lg:mx-0"
                style={{ animationDelay: "0.4s" }}
              ></div>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                <div
                  className="h-24 bg-white/15 rounded-2xl animate-pulse"
                  style={{ animationDelay: "0.6s" }}
                ></div>
                <div
                  className="h-24 bg-white/15 rounded-2xl animate-pulse"
                  style={{ animationDelay: "0.8s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 h-32 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 animate-pulse"></div>
          <div
            className="h-28 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="h-28 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
          <div
            className="md:col-span-2 h-32 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 animate-pulse"
            style={{ animationDelay: "0.6s" }}
          ></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 shadow-lg">
            <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
            <span className="text-emerald-700 font-semibold">
              Đang tải thông tin...
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}


