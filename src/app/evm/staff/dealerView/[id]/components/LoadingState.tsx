import React from "react";

export const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-pulse mx-auto mb-4" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Đang tải thông tin
        </h3>
        <p className="text-gray-600">Vui lòng đợi trong giây lát...</p>
      </div>
    </div>
  );
};
