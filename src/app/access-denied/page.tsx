"use client";
import { useState, useEffect } from "react";

export default function AccessDenied() {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShake(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Static particles array
  const particles = [
    { id: 1, left: 10, delay: 0, duration: 4 },
    { id: 2, left: 25, delay: 1, duration: 5 },
    { id: 3, left: 40, delay: 0.5, duration: 6 },
    { id: 4, left: 55, delay: 1.5, duration: 4.5 },
    { id: 5, left: 70, delay: 2, duration: 5.5 },
    { id: 6, left: 85, delay: 0.8, duration: 4.8 },
    { id: 7, left: 15, delay: 2.5, duration: 5.2 },
    { id: 8, left: 30, delay: 1.2, duration: 6.2 },
    { id: 9, left: 45, delay: 0.3, duration: 4.3 },
    { id: 10, left: 60, delay: 1.8, duration: 5.8 },
    { id: 11, left: 75, delay: 2.3, duration: 4.7 },
    { id: 12, left: 90, delay: 0.6, duration: 5.6 },
    { id: 13, left: 20, delay: 1.4, duration: 6.4 },
    { id: 14, left: 50, delay: 2.1, duration: 4.1 },
    { id: 15, left: 80, delay: 0.9, duration: 5.9 }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      {particles.map(particle =>
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-red-500 rounded-full opacity-20"
          style={{
            left: `${particle.left}%`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`
          }}
        />
      )}

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div
        className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="max-w-lg w-full relative z-10">
        <div
          className={`bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 transition-all duration-500 ${shake
            ? "animate-shake"
            : ""}`}
        >
          {/* Lock Icon with Glow */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Pulsing Rings */}
              <div className="absolute inset-0 rounded-full">
                <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping" />
                <div className="absolute inset-0 bg-red-500 rounded-full opacity-30 animate-pulse" />
              </div>

              {/* Icon Container */}
              <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-rose-700 rounded-full p-8 shadow-2xl">
                <svg
                  className="w-20 h-20 text-white drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-500" />
              </div>
            </div>
          </div>

          {/* Title with Gradient */}
          <h1 className="text-4xl font-black text-center bg-gradient-to-r from-red-400 via-red-300 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight">
            Truy Cập Bị Từ Chối
          </h1>

          {/* Subtitle */}
          <p className="text-center text-white/80 mb-8 leading-relaxed text-lg">
            Xin lỗi, bạn không có quyền truy cập vào trang này. Vui lòng liên hệ
            quản trị viên nếu bạn cho rằng đây là lỗi.
          </p>

          {/* Error Code Badge */}
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 mb-8 group hover:bg-red-500/30 transition-all duration-300">
            <div className="flex items-center justify-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <p className="text-red-300 font-bold text-lg tracking-wider">
                ERROR <span className="font-mono text-xl">403</span>
              </p>
              <div className="text-white/60 text-sm">·</div>
              <p className="text-red-200 text-sm">Forbidden Access</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-red-500/50 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Quay Lại
            </button>

            <button
              onClick={() => (window.location.href = "/auth/login")}
              className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-4 rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Về Trang Đăng nhập
            </button>
          </div>

          {/* Support Info */}
          <div className="text-center">
            <p className="text-white/40 text-sm mb-2">Cần hỗ trợ?</p>
            <a
              href="mailto:support@example.com"
              className="text-red-300 hover:text-red-200 text-sm font-medium transition-colors inline-flex items-center gap-2 group"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              support@example.com
            </a>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">
                Lưu ý Bảo Mật
              </p>
              <p className="text-white/60 text-xs leading-relaxed">
                Nếu bạn tin rằng bạn nên có quyền truy cập, vui lòng kiểm tra
                thông tin đăng nhập hoặc liên hệ với quản trị viên hệ thống.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(5px);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
