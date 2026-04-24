import React from "react";

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-6" />
          <div
            className="absolute inset-0 w-24 h-24 border-4 border-fuchsia-500/30 border-t-fuchsia-400 rounded-full animate-spin mx-auto mb-6"
            style={{
              animationDirection: "reverse",
              animationDuration: "1.5s"
            }}
          />
        </div>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 font-bold text-xl animate-pulse">
          Đang tải dữ liệu...
        </p>
        <div className="flex gap-2 justify-center mt-4">
          <div
            className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce shadow-lg shadow-cyan-400/50"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce shadow-lg shadow-fuchsia-400/50"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 bg-violet-400 rounded-full animate-bounce shadow-lg shadow-violet-400/50"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
};