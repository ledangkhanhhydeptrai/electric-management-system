import React from "react";
import { Calendar } from "lucide-react";
import { formatDate } from "../shared/formatters";

interface TimelineCardProps {
  createdAt: string;
  updatedAt: string;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  createdAt,
  updatedAt
}) => {
  return (
    <div className="group bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-6 border-2 border-amber-400/40 hover:border-orange-400/70 hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 lg:col-span-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-2xl shadow-amber-500/50 group-hover:scale-110 transition-transform border-2 border-amber-400/50">
          <Calendar className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-black text-white drop-shadow-lg">
          Lịch sử thời gian
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-white/10 backdrop-blur-sm rounded-xl border border-amber-400/30 hover:bg-white/15 hover:border-amber-400/50 transition-all">
          <p className="text-xs text-amber-300 font-semibold uppercase mb-2">
            Ngày tạo
          </p>
          <p className="text-white font-bold text-xl">
            {formatDate(createdAt)}
          </p>
        </div>
        <div className="p-5 bg-white/10 backdrop-blur-sm rounded-xl border border-amber-400/30 hover:bg-white/15 hover:border-amber-400/50 transition-all">
          <p className="text-xs text-amber-300 font-semibold uppercase mb-2">
            Cập nhật lần cuối
          </p>
          <p className="text-white font-bold text-xl">
            {formatDate(updatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};