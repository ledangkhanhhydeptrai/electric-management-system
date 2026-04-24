import React from "react";
import { AlertCircle } from "lucide-react";

interface NotFoundCardProps {
  onBack: () => void;
}

export const NotFoundCard: React.FC<NotFoundCardProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border border-white/10">
        <div className="w-24 h-24 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse border-2 border-rose-500/30">
          <AlertCircle className="w-12 h-12 text-rose-400" />
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400 mb-3">
          Không tìm thấy
        </h2>
        <p className="text-gray-300 mb-8 leading-relaxed">
          Không tìm thấy thông tin inventory này trong hệ thống.
        </p>
        <button
          onClick={onBack}
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-fuchsia-500/50 transition-all hover:scale-105 active:scale-95"
        >
          Quay lại danh sách
        </button>
      </div>
    </div>
  );
};