import React from "react";
import { ArrowLeft } from "lucide-react";

interface NotFoundStateProps {
  onBack: () => void;
}

export const NotFoundState: React.FC<NotFoundStateProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-12 text-center max-w-lg border border-gray-700">
        <div className="w-28 h-28 bg-red-900 bg-opacity-50 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-red-700">
          <span className="text-6xl">🚫</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">
          Không tìm thấy xe
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          Xe không tồn tại hoặc đã bị xóa khỏi hệ thống
        </p>
        <button
          onClick={onBack}
          className="group px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-3 mx-auto transform hover:scale-105"
        >
          <ArrowLeft className="w-6 h-6 transform group-hover:-translate-x-2 transition-transform" />
          Quay lại danh sách
        </button>
      </div>
    </div>
  );
};
