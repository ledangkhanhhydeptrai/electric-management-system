import React from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";

interface ErrorStateProps {
  onBack: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md border border-red-100">
        <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <AlertCircle className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Không tìm thấy
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Đại lý này có thể đã bị xóa hoặc không tồn tại trong hệ thống.
        </p>
        <button
          onClick={onBack}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all inline-flex items-center gap-3 shadow-lg hover:shadow-xl font-bold group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Quay lại danh sách
        </button>
      </div>
    </div>
  );
};
