import React from "react";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-gray-300 hover:text-white font-semibold mb-6 transition-all group bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/20"
    >
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      Quay lại danh sách
    </button>
  );
};