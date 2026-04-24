// components/dealer-detail-view/ErrorState.tsx
import React from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";

interface ErrorStateProps {
  onBack: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Không tìm thấy đại lý
        </h2>
        <p className="text-gray-600 mb-8">
          Đại lý này có thể đã bị xóa hoặc không tồn tại.
        </p>
        <button
          onClick={onBack}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all inline-flex items-center gap-2 shadow-lg font-bold"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>
      </div>
    </div>
  );
};